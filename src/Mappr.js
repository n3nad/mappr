/*****************************************************************************
 *
 * Mappr module
 *
 ****************************************************************************/
import React, { Component } from 'react'
// import memoizeOne from 'memoize-one';
import isEqual from 'lodash.isequal'
// import throttle from 'lodash.throttle';

import { Modal } from './ElementEdit'
import Vertex from './Vertex.js'

import './MapprTypes'

import PropTypes from 'prop-types'

/**
 * Mappr library - brings modern image mapping to the web
 *
 */
class Mappr extends Component {
  /**
   * @private
   * @type {Array<string>} supportedElements - Supported elements for mapping over an image
   */
  supportedElements = ['rect', 'circle', 'polygon', 'polyline']

  /**
   * Constructor
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props)

    this.mapperDiv = null
    this.container = null

    this.mounted = true
    this.imageLoaded = false

    this.previousStates = []
    this.undoIndex = -1
    this.throttledStateStamp = 0

    this.defaultElementProps = {
      default: {
        style: {
          fill: '#c4a44c',
          fillOpacity: 0.7,
          stroke: '#ffffff',
          strokeOpacity: 1,
          strokeWidth: '2',
        },
        data: {
          text: {},
        },
      },
    }

    this.state = {
      elements: {},
      lastAddedElementId: null,
      activeElementId: null,
      clonedElementId: null,
      elementEditInProgress: false,
      elementCreateInProgress: false,
      deleteElementId: null,
      elementDrag: null,
      vertexDrag: null,
      showNonActiveElements: true,
      showHandles: true,
    }

    this.previousStates.push(this.state)

    // Keep good ratio if window size changes
    window.addEventListener('resize', this.updateUI)
  }

  componentDidMount() {
    // Initial setup of elements
    this.maybeUpdateElements(undefined, this.props.elements)
  }

  componentDidUpdate(prevProps) {
    this.maybeUpdateElements(prevProps.elements, this.props.elements)
  }

  /**
   * Cleanup on component unmount
   */
  componentWillUnmount() {
    this.mounted = false
    // Cleanup
    window.removeEventListener('resize', this.updateUI)
  }

  /*****************
   * === A P I === *
   *****************/

  /**
   * Creates element object based on provided params
   *
   * @param {string} type
   * @param {object} props
   * @param {object} vertices
   * @param {object} data
   * @return {object}
   */
  createElement(type, props = null, vertices = {}, data = {}) {
    // New element
    return {
      id: this.getNewId(),
      type: String(type),
      vertices,
      props: props ? props : this.setupDefaultProps(type),
      data,
    }
  }

  /**
   * Clones/Creates an element with the same data as the original
   *
   * @param e {Object}
   */
  cloneElement(e) {
    const { elements, clonedElementId } = this.state
    const element = elements[clonedElementId]
    const rootVertex = Object.values(element.vertices)[0]
    const previousCoords = this.toPx(rootVertex.x, rootVertex.y)
    const newCoords = this.getRelativeMousePosition(e.clientX, e.clientY)
    // Calculate position
    const newVertices = this.calculateNewElementPosition(
      previousCoords,
      newCoords,
      element.vertices
    )
    // Update elements
    const clonedProps = { ...element }
    delete clonedProps.id
    delete clonedProps.vertices
    this.updateElement(
      null,
      { ...clonedProps, vertices: newVertices },
      clonedProps.type
    )
  }

  /**
   * Gets element if exists
   *
   * @param {string} id
   * @return {object|null}
   */
  getElement(id) {
    return this.state.elements[id] || null
  }

  /**
   * Updates existing or creates new element
   *
   * @param {string|null} id (if id provided updates existing element
   * otherwise creates new element)
   * @param {object} propsToUpdate
   * @param {string} elementType
   * @param {number|null}throttleTime
   * @return {string|null} element id on success, null on failure
   */
  updateElement(
    id,
    propsToUpdate,
    elementType = 'polygon',
    throttleTime = null
  ) {
    let { elements } = this.state
    let element
    let newElement = false
    // Get or create element
    if (id) {
      element = elements[id]
    } else {
      element = this.createElement(elementType)
      newElement = true
    }
    // Element doesn't exists
    if (!element) {
      return null
    }
    // Update element
    Object.entries(propsToUpdate).forEach(([propKey, propValue]) => {
      element = { ...element, [propKey]: propValue }
    })

    // Update elements
    const elementId = element.id
    elements = { ...elements, [elementId]: element }
    const stateToUpdate = newElement
      ? {
          elements,
          activeElementId: elementId,
          lastAddedElementId: elementId,
          elementCreateInProgress: false,
          clonedElementId: null,
        }
      : { elements }
    // Update state
    this.updateState(stateToUpdate, throttleTime)
    // If parent component is subscribed for elements change
    const { getElementsOnChange } = this.props
    if (typeof getElementsOnChange === 'function') {
      getElementsOnChange(elements)
    }
    // Everything went fine return updated element id
    return elementId
  }

  /**
   * Removes element
   *
   * @param {string} id
   * @return {string|null} element id on success, null on failure
   */
  deleteElement(id) {
    const elements = { ...this.state.elements }
    // Try to get element with provided id
    const element = elements[id]
    // Element doesn't exists
    if (!element) {
      return null
    }
    // Remove element
    delete elements[id]
    // Update state
    this.updateState({
      elements,
      activeElementId: null,
      deleteElementId: null,
    })
    // Everything went fine return deleted element id
    return element.id
  }

  /**
   * Renders element with prepared props
   *
   * @param {object} element
   * @return {React.ReactElement}
   */
  renderElement(element) {
    const SvgElement = element.type
    return <SvgElement {...this.setupElementProps(element)} />
  }

  /**
   * Sets up properties on element
   * based on provided props and current vertices
   *
   * @param {Object} element
   * @return {Object}
   */
  setupElementProps = element => {
    const {
      onElementMouseOver,
      onElementMouseMove,
      onElementMouseOut,
    } = this.props
    const vertices = Object.values(element.vertices)
    const elementId = element.id
    const elementType = element.type
    // Provided props
    let finalProps = {
      onClick: this.onElementClickHandler(element),
      onMouseDown: this.onElementDragStart,
      onMouseUp: this.onElementDragEnd,
      onMouseOver: event =>
        onElementMouseOver && onElementMouseOver(element, event),
      onMouseMove: event =>
        onElementMouseMove && onElementMouseMove(element, event),
      onMouseOut: event =>
        onElementMouseOut && onElementMouseOut(element, event),
      className: 'mappr__element',
      ...element.props,
    }
    // For polyline elements we can't have fill styles
    if (elementType === 'polyline') {
      finalProps.style = finalProps.style ? { ...finalProps.style } : {}
      finalProps.style.fill = 'none'
    }

    finalProps.key = elementId
    // Polygon
    if (elementType === 'polygon' || elementType === 'polyline') {
      finalProps.points = vertices.reduce((path, vertex) => {
        path = path.length > 0 ? path + ' ' : path
        // From relative to px units
        const coords = this.toPx(vertex.x, vertex.y)
        path += `${coords.x} ${coords.y}`
        return path
      }, '')
    } else if (elementType === 'rect' || elementType === 'circle') {
      // Not enough vertices to form a shape
      if (vertices.length < 2) {
        return finalProps
      }
      // Extract vertices
      const [vertexA, vertexB] = vertices
      // Get px coordinates for both vertices
      const coordsA = this.toPx(vertexA.x, vertexA.y)
      const coordsB = this.toPx(vertexB.x, vertexB.y)
      // Absolute difference between x and y points
      const xAbs = Math.abs(coordsA.x - coordsB.x)
      const yAbs = Math.abs(coordsA.y - coordsB.y)
      // Format rect props
      if (elementType === 'rect') {
        finalProps.x = Math.min(coordsA.x, coordsB.x)
        finalProps.y = Math.min(coordsA.y, coordsB.y)
        finalProps.width = xAbs
        finalProps.height = yAbs
      } else {
        // Format circle props
        finalProps.cx = coordsA.x
        finalProps.cy = coordsA.y
        finalProps.r = Math.hypot(xAbs, yAbs)
      }
    } else if (elementType === 'image') {
      // Not enough vertices to form a shape
      if (!vertices.length) {
        return finalProps
      }
      const {
        data: { image },
      } = element
      const [vertex] = vertices
      const { x, y } = this.toPx(vertex.x, vertex.y)
      const { x: width, y: height } = this.toPx(image.width, image.height)
      // Setup image props
      finalProps.xlinkHref = image.src
      if (width) {
        finalProps.width = width
      }
      if (height) {
        finalProps.height = image.height
      }
      finalProps.x = x
      finalProps.y = y
    }

    return finalProps
  }

  /**
   * Prepare current elements for render
   *
   * @param {object} elements
   * @return {Array<React.ReactElement>}
   */
  renderElements(elements) {
    const { editMode } = this.props
    const { activeElementId, showHandles, showNonActiveElements } = this.state
    // Hide non-active elements in edit mode
    if (editMode && activeElementId && !showNonActiveElements) {
      elements = { [activeElementId]: elements[activeElementId] }
    }
    // Map elements to ReactElements
    const elementsToRender = Object.values(elements).map(element => {
      let whatToRender = []
      const renderedElement = this.renderElement(element)
      whatToRender.push(renderedElement)

      const elementId = element.id
      // If in edit mode render vertices for an active element
      if (editMode && activeElementId == elementId && showHandles) {
        const verticesToRender = Object.values(element.vertices).map(vertex =>
          this.renderVertex(vertex)
        )
        whatToRender = whatToRender.concat(verticesToRender)
      }
      return (
        <g key={elementId} id={elementId}>
          {whatToRender}
        </g>
      )
    })
    // Active element needs to be rendered last
    // because of the way dom rendering of svg elements works
    // otherwise we wouldn't be able to remove vertices which are overlapped
    // by the last element in the list
    if (editMode && activeElementId) {
      elementsToRender.sort((a, b) => {
        if (a.key === activeElementId) {
          return 1
        } else if (b.key === activeElementId) {
          return -1
        } else {
          return 0
        }
      })
    }

    return elementsToRender
  }

  /**
   * Creates new vertex with provided props
   *
   * @param {object} props
   * @return {object}
   */
  createVertex = props => {
    // From px to relative units
    const coords = this.fromPx(props.x, props.y)
    // New vertex
    return {
      id: this.getNewId(),
      x: coords.x,
      y: coords.y,
    }
  }

  /**
   * Finds vertex on element and returns it
   *
   * @param vertexId
   * @param elementId
   * @return {object|null} vertex on success|null on failure
   */
  getVertex(vertexId, elementId) {
    let vertex
    // Get element
    const element = this.getElement(elementId)
    // Get vertex
    if (element) {
      vertex = element.vertices[vertexId]
    }
    if (vertex) {
      return vertex
    } else {
      return null
    }
  }

  /**
   * Updates or creates new vertex on element
   *
   * @param {string|null} vertexId gets vertex if id provided
   * otherwise creates new vertex
   * @param {string} elementId
   * @param {object} coords
   * @param {number|null} throttleTime
   * @return {string|null} vertex id on success|null on failure
   */
  updateVertex(vertexId, elementId, coords, throttleTime = null) {
    let vertex
    let element
    let newVertex = false
    // New or existing vertex?
    if (vertexId) {
      vertex = this.getVertex(vertexId, elementId)
    } else {
      // Create new vertex
      vertex = this.createVertex(coords)
      newVertex = true
    }
    // Vertex doesn't exist
    if (!vertex) {
      return null
    }
    // Get element
    element = this.getElement(elementId)
    // Element not found
    if (!element) {
      return null
    }
    const elementType = element.type
    // Update or not, based on element type
    if (
      newVertex &&
      elementType === 'image' &&
      Object.keys(element.vertices).length === 1
    ) {
      // Only one vertex can be added to image type element
      return null
    }
    if (
      newVertex &&
      (elementType === 'circle' || elementType === 'rect') &&
      Object.keys(element.vertices).length === 2
    ) {
      // New vertex can be added to circle and rect
      // only if there is not 2 vertices already
      return null
    }
    // Setup vertex props
    if (!newVertex) {
      const relativeCoords = this.fromPx(coords.x, coords.y)
      vertex = { ...vertex, x: relativeCoords.x, y: relativeCoords.y }
    }
    // Update element
    const vertices = { ...element.vertices }
    const latestVertexId = vertex.id
    vertices[latestVertexId] = vertex
    const updatedElementId = this.updateElement(
      elementId,
      { vertices },
      '',
      throttleTime
    )
    // Updated or not?
    if (updatedElementId) {
      return latestVertexId
    } else {
      return null
    }
  }

  /**
   * Deletes vertex on element
   *
   * @param {string} id
   * @param {string} elementId
   * @return {string|null} deleted vertex id on success | null on failure
   */
  deleteVertex(id, elementId) {
    // Get element and setup new vertices
    const element = this.getElement(elementId)
    // Bad id
    if (!element) {
      return null
    }
    const vertices = { ...element.vertices }
    // Remove vertex
    delete vertices[id]
    // Update
    const updatedElementId = this.updateElement(elementId, { vertices })
    if (updatedElementId) {
      return id
    } else {
      return null
    }
  }

  /**
   * Renders vertex
   *
   * @param {object} vertex
   * @return {React.ReactElement}
   */
  renderVertex(vertex) {
    // From relative unit to px
    const vertexId = vertex.id
    const coords = this.toPx(vertex.x, vertex.y)
    return (
      <Vertex
        key={vertexId}
        id={vertexId}
        style={{ cursor: 'pointer' }}
        cx={String(coords.x)}
        cy={String(coords.y)}
        r={5}
        fill={'yellow'}
        onMouseDown={this.onVertexDragStart}
        onMouseUp={this.onVertexDragEnd}
        onContextMenu={this.onVertexRemove}
      />
    )
  }

  /**
   * Setups layout/elements for render
   *
   * @return {React.ReactElement[]}
   */
  renderLayout() {
    // Image not ready
    if (!this.imageLoaded) return null

    const { elements } = this.state

    return this.renderElements(elements)
  }

  /**
   * Get latest elements as object
   *
   * @return {object}
   */
  getElements() {
    return this.state.elements
  }

  /**
   * Updates state and takes care of state chain (undo/redo chain)
   *
   * @param {object} newState
   * @param {number|null} throttleTime
   */
  updateState(newState, throttleTime = null) {
    this.setState(state => {
      const finalState = { ...state, ...newState }
      if (this.undoIndex < this.previousStates.length - 1) {
        this.previousStates.splice(this.undoIndex + 1)
      }

      if (throttleTime) {
        const now = Date.now()
        if (now - throttleTime <= this.throttledStateStamp) {
          this.previousStates[this.previousStates.length - 1] = finalState
        } else {
          this.previousStates.push(finalState)
        }
        this.throttledStateStamp = now
      } else {
        this.previousStates.push(finalState)
      }
      this.undoIndex = this.previousStates.length - 1

      return finalState
    })
  }

  /**
   * Reverts state to the PREVIOUS state in the state chain
   */
  undo = () => {
    this.undoIndex = Math.max(this.undoIndex - 1, 0)
    const revertedState = this.previousStates[this.undoIndex]

    this.setState(() => revertedState)
  }

  /**
   * Reverts state to the NEXT state in the state chain
   */
  redo = () => {
    this.undoIndex = Math.min(
      this.undoIndex + 1,
      this.previousStates.length - 1
    )
    const revertedState = this.previousStates[this.undoIndex]

    this.setState(() => revertedState)
  }

  // sortActiveElement = direction => e => {
  //   e.preventDefault()
  //   const { elements, elementsOrder, activeElementId } = this.state
  //   const newElementsOrder = [...elementsOrder]
  //   const position = elementsOrder.findIndex(activeElementId)
  //   if (position < 0) {
  //     return
  //   }
  //   const [elementId] = newElementsOrder.splice(position, 1)
  //   if (direction === 'back') {
  //     newElementsOrder.push(elementId)
  //   } else if (direction === 'front') {
  //     newElementsOrder.unshift(elementId)
  //   }
  //
  //   this.setState(state => ({ ...state, elementsOrder: newElementsOrder }))
  // }

  /*******************
   * === HELPERS === *
   *******************/

  /**
   * Gets mapper div ref
   *
   * @param {HTMLElement} mapperDiv
   */
  getMapperDivRef = mapperDiv => {
    this.mapperDiv = mapperDiv
  }

  /**
   * Gets mapper container ref
   *
   * @param {HTMLElement} container
   */
  getContainerRef = container => {
    this.container = container
  }

  /**
   * Helper for updating UI state on window resize
   */

  updateUI = () => this.forceUpdate()

  /**
   * Gets mapper image ref
   *
   * @param {HTMLElement} image
   */
  getImageRef = image => {
    this.image = image
  }

  /**
   * Checks for changes in provided elements
   * and updates them based on edit mode
   *
   * @param {object} prevElements
   * @param {object} elements
   */
  maybeUpdateElements(prevElements, elements) {
    // Check for changes
    // NOTE: It would be easier/more efficient to memoize this method
    // and escape deep equal checking, but if user
    // unintentionally creates new elements object on every render
    // and provides them to Mappr, updates to existing elements
    // won't work properly in edit mode
    if (!isEqual(prevElements, elements)) {
      let newElements
      const { editMode } = this.props
      // In edit mode merge with current elements
      if (editMode) {
        const currentElements = this.state.elements
        newElements = { ...currentElements, ...elements }
      } else {
        // In live mode show new elements
        newElements = elements
      }
      // Update state
      this.setState({ elements: newElements })
    }
  }

  setupDefaultProps(elementType) {
    let finalProps
    // User provided default global element props
    const { elements, lastAddedElementId } = this.state
    const { defaultElementProps } = this.props
    const element = (lastAddedElementId && elements[lastAddedElementId]) || null
    // default props are provided, they take precedence
    if (defaultElementProps) {
      finalProps =
        defaultElementProps[elementType] ||
        defaultElementProps.default ||
        this.defaultElementProps[elementType] ||
        this.defaultElementProps.default
    } else if (element) {
      finalProps = element.props
    } else {
      finalProps =
        this.defaultElementProps[elementType] ||
        this.defaultElementProps.default
    }
    return finalProps
  }

  /**
   * Helper for transforming px values to relative ones
   *
   * @param {number} x
   * @param {number} y
   * @return {object}
   */
  fromPx = (x, y) => {
    x = x === 0 ? 0 : this.container.offsetWidth / x
    y = y === 0 ? 0 : this.container.offsetHeight / y

    return { x, y }
  }

  /**
   * Helper for transforming relative values to pixels
   *
   * @param {number} x
   * @param {number} y
   * @return {{x: number, y: number}}
   */
  toPx = (x, y) => {
    x = x === 0 ? 0 : Math.round(this.container.offsetWidth / x)
    y = y === 0 ? 0 : Math.round(this.container.offsetHeight / y)

    return { x, y }
  }

  /**
   * Calculates relative mouse position against container
   *
   * @param {number} mouseX
   * @param {number} mouseY
   * @return {{x: number, y: number}}
   */
  getRelativeMousePosition(mouseX, mouseY) {
    const rect = this.container.getBoundingClientRect()
    const x = mouseX - rect.left
    const y = mouseY - rect.top
    return { x, y }
  }

  /**
   * Calculates new element vertices coordinates
   * based on mouse position change
   *
   * @param {Object} previousCoords
   * @param {Object} nextCoords
   * @param {Object} vertices
   * @return {Object}
   */
  calculateNewElementPosition(previousCoords, nextCoords, vertices) {
    const xDiff = previousCoords.x - nextCoords.x
    const yDiff = previousCoords.y - nextCoords.y
    // Update vertices positions
    const newVertices = Object.values(vertices).reduce(
      (newVertices, vertex) => {
        const vertexCoords = this.toPx(vertex.x, vertex.y)
        const newX = vertexCoords.x - xDiff
        const newY = vertexCoords.y - yDiff
        const newVertexCoords = this.fromPx(newX, newY)
        newVertices[vertex.id] = { ...vertex, ...newVertexCoords }
        return newVertices
      },
      {}
    )

    return newVertices
  }

  /**
   * Creates unique id
   *
   * @return {string}
   */
  getNewId() {
    return (
      '_' +
      Date.now().toString(36) +
      Math.random()
        .toString(36)
        .substr(2, 6)
    )
  }

  /**
   * Helper for handling element updates
   *
   * @param {string} elementId
   * @return {function(string): function({}): void}
   */
  elementUpdater = elementId => propKey => propsToUpdate => {
    const element = this.getElement(elementId)
    // Element doesn't exists
    if (!element) {
      return null
    }
    try {
      // Merge in new data
      const currentData = element[propKey]
      const newData = { ...currentData, ...propsToUpdate }
      // Update
      this.updateElement(elementId, { [propKey]: newData })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.info(
        `Element wasn't updated due to the error in the provided data ${propsToUpdate}. Data need to be provided in the form of an object { propToUpdate: propValue }`
      )
    }
  }

  renderEditWindow(element, saveProps, saveData, closeEditWindow) {
    return (
      <div>
        {`This is ${element.id} element.`}
        <button
          onClick={e => {
            e.preventDefault()
            closeEditWindow()
          }}>
          Close window
        </button>
      </div>
    )
  }

  renderEditMenu() {
    const {
      elementCreateInProgress,
      activeElementId,
      showNonActiveElements,
    } = this.state
    return (
      <div
        className="action-buttons"
        style={{ position: 'absolute', bottom: '10px' }}>
        <div>
          {elementCreateInProgress ? this.renderElementTypeOptions() : null}
          <button
            disabled={!!activeElementId}
            onClick={this.onCreateElement}
            className="button action-buttons__add-element">
            Add New Element
          </button>
          <button
            disabled={!activeElementId || elementCreateInProgress}
            onClick={this.onToggleNonActiveElements}
            className="button action-buttons__add-element">
            {showNonActiveElements
              ? 'Hide non-active elements'
              : 'Show non-active elements'}
          </button>
          <button
            disabled={
              !this.previousStates.length ||
              this.undoIndex < 0 ||
              this.undoIndex === 0
            }
            onClick={this.undo}
            className="button">
            Undo
          </button>
          <button
            disabled={
              !this.previousStates.length ||
              this.undoIndex < 0 ||
              this.undoIndex === this.previousStates.length - 1
            }
            onClick={this.redo}
            className="button">
            Redo
          </button>
        </div>
        <div>{this.renderElementActions()}</div>
      </div>
    )
  }

  /**
   * Renders element actions menu
   */
  renderElementActions() {
    const { elements, activeElementId, showHandles } = this.state
    const element = elements[activeElementId]

    return (
      <div>
        Element actions:
        <button
          disabled={!activeElementId}
          onClick={this.onFinishEditing}
          className="button action-buttons__finish-edit">
          Finish editing
        </button>
        <button
          disabled={!activeElementId}
          className="button"
          onClick={this.onElementEdit}>
          Data & props
        </button>
        <button
          disabled={!activeElementId}
          className="button"
          onClick={this.onHandlesToggle}>
          {showHandles ? 'Hide handles' : 'Show handles'}
        </button>
        <button
          disabled={!activeElementId}
          className="button"
          onClick={this.onElementClone(element)}>
          Clone
        </button>
        <button
          disabled={!activeElementId}
          className="button"
          onClick={this.onElementRemove(element)}>
          Delete
        </button>
        {/*<button onClick={this.sortActiveElement('front')}>Send element to front</button>*/}
        {/*<button onClick={this.sortActiveElement('back')}>Send element to back</button>*/}
      </div>
    )
  }

  renderElementTypeOptions() {
    // Render
    return (
      <div>
        <button
          className="button action-buttons__polygon"
          onClick={this.onElementTypeSelect('polygon')}>
          Shape
        </button>
        <button
          className="button action-buttons__polyline"
          onClick={this.onElementTypeSelect('polyline')}>
          Line
        </button>
        <button
          className="button action-buttons__circle"
          onClick={this.onElementTypeSelect('circle')}>
          Circle
        </button>
        <button
          className="button action-buttons__rect"
          onClick={this.onElementTypeSelect('rect')}>
          Rectangle
        </button>
        <button
          className="button action-buttons__cancel"
          onClick={this.onCancelElementCreate}>
          Cancel
        </button>
      </div>
    )
  }

  /**
   * Calls user provided or default render function
   * with proper arguments
   *
   * @param {function} renderUserEditWindow
   * @return {React.ReactElement}
   */
  renderEditOverlay = renderUserEditWindow => {
    // Method placeholder
    let renderEditWindow
    // Render prop provided?
    if (typeof renderUserEditWindow === 'function') {
      renderEditWindow = renderUserEditWindow
    } else {
      renderEditWindow = this.renderEditWindow
    }
    const { elements, activeElementId } = this.state
    const element = elements[activeElementId]
    // Not edited
    if (!element) {
      return null
    }
    // Setup arguments
    const saveProps = this.elementUpdater(activeElementId)('props')
    const saveData = this.elementUpdater(activeElementId)('data')

    // Render window
    return (
      <Modal>
        {renderEditWindow(element, saveProps, saveData, this.closeEditWindow)}
      </Modal>
    )
  }

  /**
   * Helper handles state change on window close
   */
  closeEditWindow = () => {
    this.updateState({ elementEditInProgress: false })
  }

  /**
   * Default edit window
   *
   * @param {function} cancelDelete
   * @param {function} confirmDelete
   * @return {React.ReactElement}
   */
  renderDeleteWindow(cancelDelete, confirmDelete) {
    return (
      <Modal>
        <p>Are you sure tou want to delete this element?</p>
        <button
          onClick={e => {
            e.preventDefault()
            cancelDelete()
          }}>
          Cancel
        </button>
        <button
          onClick={e => {
            e.preventDefault()
            confirmDelete()
          }}>
          Delete
        </button>
      </Modal>
    )
  }

  /**
   * Helper for rendering proper element deletion window
   *
   * @param {function} renderUserDeleteWindow
   * @return {React.ReactElement}
   */
  renderDeleteOverlay = renderUserDeleteWindow => {
    // Method placeholder
    let renderDeleteWindow
    // Custom function provided via props
    if (typeof renderUserDeleteWindow === 'function') {
      renderDeleteWindow = renderUserDeleteWindow
    } else {
      // Fallback if render prop not provided
      renderDeleteWindow = this.renderDeleteWindow
    }
    return renderDeleteWindow(
      this.cancelDeleteElement,
      this.confirmDeleteElement
    )
  }

  /**************************
   * === EVENT HANDLERS === *
   **************************/

  /**
   * On image load event handler
   */
  onImageLoad = () => {
    this.imageLoaded = true

    this.forceUpdate()
  }

  isActiveElementAction = (event, activeElementId) => {
    let currentElement = event.target
    let isElementAction = false

    while (currentElement && currentElement.tagName.toLowerCase() !== 'svg') {
      if (currentElement.id === activeElementId) {
        isElementAction = true
        break
      }
      currentElement = currentElement.parentNode
    }

    return isElementAction
  }

  getClickedElementId(event) {
    const { elements } = this.state
    let currentElement = event.target
    let id = null

    while (currentElement && currentElement.tagName.toLowerCase() !== 'svg') {
      if (currentElement.id && elements[currentElement.id]) {
        id = currentElement.id
        break
      } else {
        currentElement = currentElement.parentNode
      }
    }

    return id
  }

  /**
   * Vertex addition event handler
   *
   * @param {Object} e
   */
  onSVGClick = e => {
    const { editMode } = this.props
    const { activeElementId, vertexDrag, clonedElementId } = this.state
    // Bail out if not in edit mode,
    // or click is on currently active element (that way we let drag handlers do their own logic)
    if (
      !editMode ||
      vertexDrag ||
      this.isActiveElementAction(e, activeElementId)
    )
      return
    // cloning in progress -> create clone
    if (clonedElementId) {
      this.cloneElement(e)
      return
    }
    // Click on another element while editing some element
    // makes clicked element active
    if (this.supportedElements.includes(e.target.tagName.toLowerCase())) {
      const id = this.getClickedElementId(e)
      if (id) {
        this.updateState({ activeElementId: e.target.parentNode.id })
      }
      return
    }

    // Setup vertex props
    if (activeElementId) {
      const vertexCoords = this.getRelativeMousePosition(e.clientX, e.clientY)
      // Update element with new vertex
      this.updateVertex(null, activeElementId, vertexCoords)
    }
  }

  onDrag = e => {
    const { elementDrag, vertexDrag } = this.state

    if (elementDrag) {
      this.onElementDrag(e)
    } else if (vertexDrag) {
      this.onVertexDrag(e)
    }
  }

  onDragEnd = e => {
    const { elementDrag, vertexDrag } = this.state

    if (elementDrag) {
      this.onElementDragEnd(e)
    } else if (vertexDrag) {
      this.onVertexDragEnd(e)
    }
  }

  /**
   * On element drag event handler
   * it simulates drag start functionality on mouse down
   *
   * @param {object} e
   */
  onElementDragStart = e => {
    e.preventDefault()
    // Prevent click on other elements cause drag start
    if (!this.isActiveElementAction(e, this.state.activeElementId)) {
      return null
    }
    // Get vertex and element id's
    let coords = this.getRelativeMousePosition(e.clientX, e.clientY)
    // Click on vertex
    this.updateState(
      {
        elementDrag: {
          lastDragPosition: coords,
        },
      },
      300
    )
  }

  /**
   * On vertex drag event handler
   * it simulates drag functionality on mouse move
   *
   * @param {object} e
   */
  onElementDrag = e => {
    // No vertex selected
    const { elements, elementDrag, activeElementId } = this.state
    if (!elementDrag) {
      return
    }
    // Current vertex
    const { lastDragPosition } = elementDrag
    // Get coords
    let newCoords = this.getRelativeMousePosition(e.clientX, e.clientY)
    // Update vertices positions
    const element = elements[activeElementId]
    const newVertices = this.calculateNewElementPosition(
      lastDragPosition,
      newCoords,
      element.vertices
    )

    // Update state
    this.updateState({ elementDrag: { lastDragPosition: newCoords } }, 300)
    // Update element
    this.updateElement(activeElementId, { vertices: newVertices }, '', 300)
  }

  /**
   * On drag end handler
   *
   * @param {object} e
   */
  onElementDragEnd = e => {
    e.preventDefault()
    // Ends up simulated dragging
    this.updateState({ elementDrag: null }, 1000)
  }

  /**
   * On vertex drag event handler
   * it simulates drag start functionality on mouse down
   *
   * @param {object} e
   */
  onVertexDragStart = e => {
    e.preventDefault()
    // Get vertex and element id's
    const vertexId = e.target.id
    const elementId = e.target.parentNode.id
    // Click on vertex
    this.updateState(
      {
        vertexDrag: {
          vertexId,
          elementId,
        },
      },
      300
    )
  }

  /**
   * On vertex drag event handler
   * it simulates drag functionality on mouse move
   *
   * @param {Object} e
   */
  onVertexDrag = e => {
    // No vertex selected
    const { vertexDrag } = this.state
    if (!vertexDrag) {
      return
    }
    // Current vertex
    const { vertexId, elementId } = vertexDrag
    // Get coords
    const { x, y } = this.getRelativeMousePosition(e.clientX, e.clientY)
    // Update vertex
    this.updateVertex(vertexId, elementId, { x, y }, 300)
  }

  /**
   * On drag end handler
   *
   * @param {object} e
   */
  onVertexDragEnd = e => {
    e.preventDefault()
    // Ends up simulated dragging
    this.updateState({ vertexDrag: null }, 300)
  }

  openElementContextMenu = e => {
    e.preventDefault()

    const contextMenuCoords = this.getRelativeMousePosition(
      e.clientX,
      e.clientY
    )

    this.setState(state => ({
      ...state,
      elementContextMenu: contextMenuCoords,
      elementDrag: null,
    }))
  }

  /**
   * Element creation handler - starts creation process
   *
   * @param {Object} e
   */
  onCreateElement = e => {
    e.preventDefault()
    // Start creation process
    this.updateState({ elementCreateInProgress: true })
  }

  /**
   * Element creation handler - finish off process on element type select
   *
   * @param elementType
   * @return {function(Object): void}
   */
  onElementTypeSelect = elementType => e => {
    e.preventDefault()
    // Create new element
    this.updateElement(null, {}, elementType)
  }

  /**
   * Cancels element deletion process
   *
   * @param {Object} e
   */
  onCancelElementCreate = e => {
    e.preventDefault()

    this.updateState({ elementCreateInProgress: false })
  }

  /**
   * Starts element edit process
   *
   * @param {Object} e
   */
  onElementEdit = e => {
    e.preventDefault()
    // Element clicked again
    this.updateState({ elementEditInProgress: true })
  }

  /**
   * Finishes edit handler
   *
   * @param {Object} e
   */
  onFinishEditing = e => {
    e.preventDefault()

    this.updateState({
      activeElementId: null,
      elementEditInProgress: false,
    })
  }

  /**
   * Toggles non-active elements visibility
   *
   * @param e {Object}
   */
  onToggleNonActiveElements = e => {
    e.preventDefault()
    const { showNonActiveElements } = this.state
    this.updateState({ showNonActiveElements: !showNonActiveElements })
  }

  /**
   * Element click handler
   *
   * wraps user provided click handler, and setups relevant data
   *
   * @param {Object} element
   * @return {function(Object): any}
   */
  onElementClickHandler = element => e => {
    e.preventDefault()
    // Extract props
    const { onElementClick, editMode } = this.props
    const activeElementId = this.state.activeElementId
    const elementId = element.id
    // We're not in edit mode just fire click handler
    if (!editMode) {
      // Edit mode off
      typeof onElementClick === 'function' && onElementClick(element, e)
      // Bail out
      return
    }
    // EDIT MODE:
    // Make it active on click, if active element is not set
    if (!activeElementId) {
      this.updateState({ activeElementId: elementId })
    }
  }

  /**
   * Copies element to state field
   *
   * @param {Object} element
   * @return {function(Object): any}
   */
  onElementClone = element => e => {
    e.preventDefault()
    const activeElementId = this.state.activeElementId
    const elementId = element.id
    // Element not active -> bail out
    if (elementId !== activeElementId) return
    // Activate deletion popup
    this.updateState({
      clonedElementId: elementId,
      activeElementId: null,
    })
  }

  /**
   * On element remove handler - start deletion process
   *
   * @param {Object} element
   * @return {function(Object): any}
   */
  onElementRemove = element => e => {
    e.preventDefault()
    const activeElementId = this.state.activeElementId
    const elementId = element.id
    // Element not active -> bail out
    if (elementId !== activeElementId) return
    // Activate deletion popup
    this.updateState({ deleteElementId: elementId })
  }

  /**
   * Element deletion cancellation wrapper
   *
   * @param {Object} e
   */
  onCancelDeleteElement = e => {
    e.preventDefault()
    this.cancelDeleteElement()
  }

  /**
   * Element deletion cancellation handler
   *
   */
  cancelDeleteElement = () => {
    this.updateState({ deleteElementId: null })
  }

  /**
   * Confirm element deletion wrapper
   *
   * @param {Object} e
   */
  onConfirmDeleteElement = e => {
    e.preventDefault()
    // Remove element
    this.confirmDeleteElement()
  }

  /**
   * Confirm element deletion handler
   */
  confirmDeleteElement = () => {
    // Remove element
    this.deleteElement(this.state.deleteElementId)
  }

  /**
   * Vertex removal handler
   *
   * @param {Object} e
   */
  onVertexRemove = e => {
    e.preventDefault()
    const id = e.target.getAttribute('id')
    const elementId = e.target.parentNode.getAttribute('id')
    this.deleteVertex(id, elementId)
  }

  /**
   * Toggle element handles handler
   *
   * @param {Object} e
   */
  onHandlesToggle = e => {
    const { showHandles } = this.state
    e.preventDefault()
    this.updateState({ showHandles: !showHandles })
  }

  /**
   * Render method
   *
   * @return {React.ReactElement}
   */
  render() {
    const {
      image,
      editMode,
      renderEditWindow,
      renderDeleteWindow,
      className,
    } = this.props
    const { deleteElementId, elementEditInProgress } = this.state

    // Render
    return (
      <div
        className={`mappr ${className ? className : ''}`}
        ref={this.getContainerRef}
        style={{ position: 'relative', display: 'block' }}>
        <div
          id="image-mapper"
          ref={this.getMapperDivRef}
          style={{
            position: 'absolute',
            left: 0,
            width: '100%',
            height: '100%',
          }}>
          {/* SVG Element START */}
          <svg
            id="svg-mapper"
            onClick={this.onSVGClick}
            onMouseMove={this.onDrag}
            onMouseUp={this.onDragEnd}
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink">
            {/* Here we render elements */}
            {this.renderLayout()}
          </svg>
          {/* SVG Element END */}
        </div>

        {/* Mapped image START */}
        <img
          ref={this.getImageRef}
          src={image}
          onLoad={this.onImageLoad}
          alt=""
          style={{ display: 'block', width: '100%' }}
        />
        {/* Mapped image END */}

        {/* Edit Mode Menu START */}
        {editMode ? this.renderEditMenu() : null}
        {/* Edit Mode Menu END */}

        {/* Edit Window START */}
        {elementEditInProgress
          ? this.renderEditOverlay(renderEditWindow)
          : null}
        {/* Edit Window END */}

        {/* Delete Window START */}
        {deleteElementId ? this.renderDeleteOverlay(renderDeleteWindow) : null}
        {/* Delete Window END */}
      </div>
    )
  }
}

Mappr.propTypes = {
  image: PropTypes.string,
  elements: PropTypes.object,
  editMode: PropTypes.bool,
  defaultElementProps: PropTypes.object,
  onElementClick: PropTypes.func,
  getElementsOnChange: PropTypes.func,
  onElementMouseOver: PropTypes.func,
  onElementMouseMove: PropTypes.func,
  onElementMouseOut: PropTypes.func,
  renderEditWindow: PropTypes.func,
  renderDeleteWindow: PropTypes.func,
  className: PropTypes.string,
}

export default Mappr
