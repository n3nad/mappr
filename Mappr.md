## Classes

<dl>
<dt><a href="#Mappr">Mappr</a> ⇐ <code>Component&lt;MapprProps,</code></dt>
<dd><p>Mappr library - brings modern image mapping to the web</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#MapprProps">MapprProps</a></dt>
<dd></dd>
</dl>

<a name="Mappr"></a>

## Mappr ⇐ <code>Component&lt;MapprProps,</code>

Mappr library - brings modern image mapping to the web

**Kind**: global class  
**Extends**: <code>Component&lt;MapprProps,</code>

- [Mappr](#Mappr) ⇐ <code>Component&lt;MapprProps,</code>
  - [new Mappr(props)](#new_Mappr_new)
  - [.setupElementProps](#Mappr+setupElementProps) ⇒ <code>Object</code>
  - [.createVertex](#Mappr+createVertex) ⇒ <code>object</code>
  - [.undo](#Mappr+undo)
  - [.redo](#Mappr+redo)
  - [.getMapperDivRef](#Mappr+getMapperDivRef)
  - [.getContainerRef](#Mappr+getContainerRef)
  - [.updateUI](#Mappr+updateUI)
  - [.getImageRef](#Mappr+getImageRef)
  - [.fromPx](#Mappr+fromPx) ⇒ <code>object</code>
  - [.toPx](#Mappr+toPx) ⇒ <code>Object</code>
  - [.elementUpdater](#Mappr+elementUpdater) ⇒ <code>function</code>
  - [.renderEditOverlay](#Mappr+renderEditOverlay) ⇒ <code>React.ReactElement</code>
  - [.closeEditWindow](#Mappr+closeEditWindow)
  - [.renderDeleteOverlay](#Mappr+renderDeleteOverlay) ⇒ <code>React.ReactElement</code>
  - [.onImageLoad](#Mappr+onImageLoad)
  - [.onSVGClick](#Mappr+onSVGClick)
  - [.onElementDragStart](#Mappr+onElementDragStart)
  - [.onElementDrag](#Mappr+onElementDrag)
  - [.onElementDragEnd](#Mappr+onElementDragEnd)
  - [.onVertexDragStart](#Mappr+onVertexDragStart)
  - [.onVertexDrag](#Mappr+onVertexDrag)
  - [.onVertexDragEnd](#Mappr+onVertexDragEnd)
  - [.onCreateElement](#Mappr+onCreateElement)
  - [.onElementTypeSelect](#Mappr+onElementTypeSelect) ⇒ <code>function</code>
  - [.onCancelElementCreate](#Mappr+onCancelElementCreate)
  - [.onElementEdit](#Mappr+onElementEdit)
  - [.onFinishEditing](#Mappr+onFinishEditing)
  - [.onToggleNonActiveElements](#Mappr+onToggleNonActiveElements)
  - [.onElementClickHandler](#Mappr+onElementClickHandler) ⇒ <code>function</code>
  - [.onElementClone](#Mappr+onElementClone) ⇒ <code>function</code>
  - [.onElementRemove](#Mappr+onElementRemove) ⇒ <code>function</code>
  - [.onCancelDeleteElement](#Mappr+onCancelDeleteElement)
  - [.cancelDeleteElement](#Mappr+cancelDeleteElement)
  - [.onConfirmDeleteElement](#Mappr+onConfirmDeleteElement)
  - [.confirmDeleteElement](#Mappr+confirmDeleteElement)
  - [.onVertexRemove](#Mappr+onVertexRemove)
  - [.onHandlesToggle](#Mappr+onHandlesToggle)
  - [.componentWillUnmount()](#Mappr+componentWillUnmount)
  - [.createElement(type, props, vertices, data)](#Mappr+createElement) ⇒ <code>object</code>
  - [.cloneElement(e)](#Mappr+cloneElement)
  - [.getElement(id)](#Mappr+getElement) ⇒ <code>object</code> \| <code>null</code>
  - [.updateElement(id, propsToUpdate, elementType, throttleTime)](#Mappr+updateElement) ⇒ <code>string</code> \| <code>null</code>
  - [.deleteElement(id)](#Mappr+deleteElement) ⇒ <code>string</code> \| <code>null</code>
  - [.renderElement(element)](#Mappr+renderElement) ⇒ <code>React.ReactElement</code>
  - [.renderElements(elements)](#Mappr+renderElements) ⇒ <code>Array.&lt;React.ReactElement&gt;</code>
  - [.getVertex(vertexId, elementId)](#Mappr+getVertex) ⇒ <code>object</code> \| <code>null</code>
  - [.updateVertex(vertexId, elementId, coords, throttleTime)](#Mappr+updateVertex) ⇒ <code>string</code> \| <code>null</code>
  - [.deleteVertex(id, elementId)](#Mappr+deleteVertex) ⇒ <code>string</code> \| <code>null</code>
  - [.renderVertex(vertex)](#Mappr+renderVertex) ⇒ <code>React.ReactElement</code>
  - [.renderLayout()](#Mappr+renderLayout) ⇒ <code>Array.&lt;React.ReactElement&gt;</code>
  - [.getElements()](#Mappr+getElements) ⇒ <code>object</code>
  - [.updateState(newState, throttleTime)](#Mappr+updateState)
  - [.maybeUpdateElements(prevElements, elements)](#Mappr+maybeUpdateElements)
  - [.getRelativeMousePosition(mouseX, mouseY)](#Mappr+getRelativeMousePosition) ⇒ <code>Object</code>
  - [.calculateNewElementPosition(previousCoords, nextCoords, vertices)](#Mappr+calculateNewElementPosition) ⇒ <code>Object</code>
  - [.getNewId()](#Mappr+getNewId) ⇒ <code>string</code>
  - [.renderElementActions()](#Mappr+renderElementActions)
  - [.renderDeleteWindow(cancelDelete, confirmDelete)](#Mappr+renderDeleteWindow) ⇒ <code>React.ReactElement</code>
  - [.render()](#Mappr+render) ⇒ <code>React.ReactElement</code>

<a name="new_Mappr_new"></a>

### new Mappr(props)

Constructor

| Param | Type                                   |
| ----- | -------------------------------------- |
| props | [<code>MapprProps</code>](#MapprProps) |

**Example**

```js
<Mappr image="image.png" editMode={true} />
```

<a name="Mappr+setupElementProps"></a>

### mappr.setupElementProps ⇒ <code>Object</code>

Sets up properties on element
based on provided props and current vertices

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param   | Type                |
| ------- | ------------------- |
| element | <code>Object</code> |

<a name="Mappr+createVertex"></a>

### mappr.createVertex ⇒ <code>object</code>

Creates new vertex with provided props

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param | Type                |
| ----- | ------------------- |
| props | <code>object</code> |

<a name="Mappr+undo"></a>

### mappr.undo

Reverts state to the PREVIOUS state in the state chain

**Kind**: instance property of [<code>Mappr</code>](#Mappr)  
<a name="Mappr+redo"></a>

### mappr.redo

Reverts state to the NEXT state in the state chain

**Kind**: instance property of [<code>Mappr</code>](#Mappr)  
<a name="Mappr+getMapperDivRef"></a>

### mappr.getMapperDivRef

Gets mapper div ref

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param     | Type                     |
| --------- | ------------------------ |
| mapperDiv | <code>HTMLElement</code> |

<a name="Mappr+getContainerRef"></a>

### mappr.getContainerRef

Gets mapper container ref

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param     | Type                     |
| --------- | ------------------------ |
| container | <code>HTMLElement</code> |

<a name="Mappr+updateUI"></a>

### mappr.updateUI

Helper for updating UI state on window resize

**Kind**: instance property of [<code>Mappr</code>](#Mappr)  
<a name="Mappr+getImageRef"></a>

### mappr.getImageRef

Gets mapper image ref

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param | Type                     |
| ----- | ------------------------ |
| image | <code>HTMLElement</code> |

<a name="Mappr+fromPx"></a>

### mappr.fromPx ⇒ <code>object</code>

Helper for transforming px values to relative ones

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param | Type                |
| ----- | ------------------- |
| x     | <code>number</code> |
| y     | <code>number</code> |

<a name="Mappr+toPx"></a>

### mappr.toPx ⇒ <code>Object</code>

Helper for transforming relative values to pixels

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param | Type                |
| ----- | ------------------- |
| x     | <code>number</code> |
| y     | <code>number</code> |

<a name="Mappr+elementUpdater"></a>

### mappr.elementUpdater ⇒ <code>function</code>

Helper for handling element updates

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param     | Type                |
| --------- | ------------------- |
| elementId | <code>string</code> |

<a name="Mappr+renderEditOverlay"></a>

### mappr.renderEditOverlay ⇒ <code>React.ReactElement</code>

Calls user provided or default render function
with proper arguments

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param                | Type                  |
| -------------------- | --------------------- |
| renderUserEditWindow | <code>function</code> |

<a name="Mappr+closeEditWindow"></a>

### mappr.closeEditWindow

Helper handles state change on window close

**Kind**: instance property of [<code>Mappr</code>](#Mappr)  
<a name="Mappr+renderDeleteOverlay"></a>

### mappr.renderDeleteOverlay ⇒ <code>React.ReactElement</code>

Helper for rendering proper element deletion window

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param                  | Type                  |
| ---------------------- | --------------------- |
| renderUserDeleteWindow | <code>function</code> |

<a name="Mappr+onImageLoad"></a>

### mappr.onImageLoad

On image load event handler

**Kind**: instance property of [<code>Mappr</code>](#Mappr)  
<a name="Mappr+onSVGClick"></a>

### mappr.onSVGClick

Vertex addition event handler

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param | Type                |
| ----- | ------------------- |
| e     | <code>Object</code> |

<a name="Mappr+onElementDragStart"></a>

### mappr.onElementDragStart

On element drag event handler
it simulates drag start functionality on mouse down

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param | Type                |
| ----- | ------------------- |
| e     | <code>object</code> |

<a name="Mappr+onElementDrag"></a>

### mappr.onElementDrag

On vertex drag event handler
it simulates drag functionality on mouse move

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param | Type                |
| ----- | ------------------- |
| e     | <code>object</code> |

<a name="Mappr+onElementDragEnd"></a>

### mappr.onElementDragEnd

On drag end handler

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param | Type                |
| ----- | ------------------- |
| e     | <code>object</code> |

<a name="Mappr+onVertexDragStart"></a>

### mappr.onVertexDragStart

On vertex drag event handler
it simulates drag start functionality on mouse down

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param | Type                |
| ----- | ------------------- |
| e     | <code>object</code> |

<a name="Mappr+onVertexDrag"></a>

### mappr.onVertexDrag

On vertex drag event handler
it simulates drag functionality on mouse move

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param | Type                |
| ----- | ------------------- |
| e     | <code>Object</code> |

<a name="Mappr+onVertexDragEnd"></a>

### mappr.onVertexDragEnd

On drag end handler

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param | Type                |
| ----- | ------------------- |
| e     | <code>object</code> |

<a name="Mappr+onCreateElement"></a>

### mappr.onCreateElement

Element creation handler - starts creation process

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param | Type                |
| ----- | ------------------- |
| e     | <code>Object</code> |

<a name="Mappr+onElementTypeSelect"></a>

### mappr.onElementTypeSelect ⇒ <code>function</code>

Element creation handler - finish off process on element type select

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param       |
| ----------- |
| elementType |

<a name="Mappr+onCancelElementCreate"></a>

### mappr.onCancelElementCreate

Cancels element deletion process

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param | Type                |
| ----- | ------------------- |
| e     | <code>Object</code> |

<a name="Mappr+onElementEdit"></a>

### mappr.onElementEdit

Starts element edit process

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param | Type                |
| ----- | ------------------- |
| e     | <code>Object</code> |

<a name="Mappr+onFinishEditing"></a>

### mappr.onFinishEditing

Finishes edit handler

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param | Type                |
| ----- | ------------------- |
| e     | <code>Object</code> |

<a name="Mappr+onToggleNonActiveElements"></a>

### mappr.onToggleNonActiveElements

Toggles non-active elements visibility

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param | Type                |
| ----- | ------------------- |
| e     | <code>Object</code> |

<a name="Mappr+onElementClickHandler"></a>

### mappr.onElementClickHandler ⇒ <code>function</code>

Element click handler

wraps user provided click handler, and setups relevant data

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param   | Type                |
| ------- | ------------------- |
| element | <code>Object</code> |

<a name="Mappr+onElementClone"></a>

### mappr.onElementClone ⇒ <code>function</code>

Copies element to state field

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param   | Type                |
| ------- | ------------------- |
| element | <code>Object</code> |

<a name="Mappr+onElementRemove"></a>

### mappr.onElementRemove ⇒ <code>function</code>

On element remove handler - start deletion process

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param   | Type                |
| ------- | ------------------- |
| element | <code>Object</code> |

<a name="Mappr+onCancelDeleteElement"></a>

### mappr.onCancelDeleteElement

Element deletion cancellation wrapper

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param | Type                |
| ----- | ------------------- |
| e     | <code>Object</code> |

<a name="Mappr+cancelDeleteElement"></a>

### mappr.cancelDeleteElement

Element deletion cancellation handler

**Kind**: instance property of [<code>Mappr</code>](#Mappr)  
<a name="Mappr+onConfirmDeleteElement"></a>

### mappr.onConfirmDeleteElement

Confirm element deletion wrapper

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param | Type                |
| ----- | ------------------- |
| e     | <code>Object</code> |

<a name="Mappr+confirmDeleteElement"></a>

### mappr.confirmDeleteElement

Confirm element deletion handler

**Kind**: instance property of [<code>Mappr</code>](#Mappr)  
<a name="Mappr+onVertexRemove"></a>

### mappr.onVertexRemove

Vertex removal handler

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param | Type                |
| ----- | ------------------- |
| e     | <code>Object</code> |

<a name="Mappr+onHandlesToggle"></a>

### mappr.onHandlesToggle

Toggle element handles handler

**Kind**: instance property of [<code>Mappr</code>](#Mappr)

| Param | Type                |
| ----- | ------------------- |
| e     | <code>Object</code> |

<a name="Mappr+componentWillUnmount"></a>

### mappr.componentWillUnmount()

Cleanup on component unmount

**Kind**: instance method of [<code>Mappr</code>](#Mappr)  
<a name="Mappr+createElement"></a>

### mappr.createElement(type, props, vertices, data) ⇒ <code>object</code>

Creates element object based on provided params

**Kind**: instance method of [<code>Mappr</code>](#Mappr)

| Param    | Type                | Default       |
| -------- | ------------------- | ------------- |
| type     | <code>string</code> |               |
| props    | <code>object</code> | <code></code> |
| vertices | <code>object</code> |               |
| data     | <code>object</code> |               |

<a name="Mappr+cloneElement"></a>

### mappr.cloneElement(e)

Clones/Creates an element with the same data as the original

**Kind**: instance method of [<code>Mappr</code>](#Mappr)

| Param | Type                |
| ----- | ------------------- |
| e     | <code>Object</code> |

<a name="Mappr+getElement"></a>

### mappr.getElement(id) ⇒ <code>object</code> \| <code>null</code>

Gets element if exists

**Kind**: instance method of [<code>Mappr</code>](#Mappr)

| Param | Type                |
| ----- | ------------------- |
| id    | <code>string</code> |

<a name="Mappr+updateElement"></a>

### mappr.updateElement(id, propsToUpdate, elementType, throttleTime) ⇒ <code>string</code> \| <code>null</code>

Updates existing or creates new element

**Kind**: instance method of [<code>Mappr</code>](#Mappr)  
**Returns**: <code>string</code> \| <code>null</code> - element id on success, null on failure

| Param         | Type                                     | Default                          | Description                                                             |
| ------------- | ---------------------------------------- | -------------------------------- | ----------------------------------------------------------------------- |
| id            | <code>string</code> \| <code>null</code> |                                  | (if id provided updates existing element otherwise creates new element) |
| propsToUpdate | <code>object</code>                      |                                  |                                                                         |
| elementType   | <code>string</code>                      | <code>&quot;polygon&quot;</code> |                                                                         |
| throttleTime  | <code>number</code> \| <code>null</code> | <code></code>                    |                                                                         |

<a name="Mappr+deleteElement"></a>

### mappr.deleteElement(id) ⇒ <code>string</code> \| <code>null</code>

Removes element

**Kind**: instance method of [<code>Mappr</code>](#Mappr)  
**Returns**: <code>string</code> \| <code>null</code> - element id on success, null on failure

| Param | Type                |
| ----- | ------------------- |
| id    | <code>string</code> |

<a name="Mappr+renderElement"></a>

### mappr.renderElement(element) ⇒ <code>React.ReactElement</code>

Renders element with prepared props

**Kind**: instance method of [<code>Mappr</code>](#Mappr)

| Param   | Type                |
| ------- | ------------------- |
| element | <code>object</code> |

<a name="Mappr+renderElements"></a>

### mappr.renderElements(elements) ⇒ <code>Array.&lt;React.ReactElement&gt;</code>

Prepare current elements for render

**Kind**: instance method of [<code>Mappr</code>](#Mappr)

| Param    | Type                |
| -------- | ------------------- |
| elements | <code>object</code> |

<a name="Mappr+getVertex"></a>

### mappr.getVertex(vertexId, elementId) ⇒ <code>object</code> \| <code>null</code>

Finds vertex on element and returns it

**Kind**: instance method of [<code>Mappr</code>](#Mappr)  
**Returns**: <code>object</code> \| <code>null</code> - vertex on success|null on failure

| Param     |
| --------- |
| vertexId  |
| elementId |

<a name="Mappr+updateVertex"></a>

### mappr.updateVertex(vertexId, elementId, coords, throttleTime) ⇒ <code>string</code> \| <code>null</code>

Updates or creates new vertex on element

**Kind**: instance method of [<code>Mappr</code>](#Mappr)  
**Returns**: <code>string</code> \| <code>null</code> - vertex id on success|null on failure

| Param        | Type                                     | Default       | Description                                             |
| ------------ | ---------------------------------------- | ------------- | ------------------------------------------------------- |
| vertexId     | <code>string</code> \| <code>null</code> |               | gets vertex if id provided otherwise creates new vertex |
| elementId    | <code>string</code>                      |               |                                                         |
| coords       | <code>object</code>                      |               |                                                         |
| throttleTime | <code>number</code> \| <code>null</code> | <code></code> |                                                         |

<a name="Mappr+deleteVertex"></a>

### mappr.deleteVertex(id, elementId) ⇒ <code>string</code> \| <code>null</code>

Deletes vertex on element

**Kind**: instance method of [<code>Mappr</code>](#Mappr)  
**Returns**: <code>string</code> \| <code>null</code> - deleted vertex id on success | null on failure

| Param     | Type                |
| --------- | ------------------- |
| id        | <code>string</code> |
| elementId | <code>string</code> |

<a name="Mappr+renderVertex"></a>

### mappr.renderVertex(vertex) ⇒ <code>React.ReactElement</code>

Renders vertex

**Kind**: instance method of [<code>Mappr</code>](#Mappr)

| Param  | Type                |
| ------ | ------------------- |
| vertex | <code>object</code> |

<a name="Mappr+renderLayout"></a>

### mappr.renderLayout() ⇒ <code>Array.&lt;React.ReactElement&gt;</code>

Setups layout/elements for render

**Kind**: instance method of [<code>Mappr</code>](#Mappr)  
<a name="Mappr+getElements"></a>

### mappr.getElements() ⇒ <code>object</code>

Get latest elements as object

**Kind**: instance method of [<code>Mappr</code>](#Mappr)  
<a name="Mappr+updateState"></a>

### mappr.updateState(newState, throttleTime)

Updates state and takes care of state chain (undo/redo chain)

**Kind**: instance method of [<code>Mappr</code>](#Mappr)

| Param        | Type                                     | Default       |
| ------------ | ---------------------------------------- | ------------- |
| newState     | <code>object</code>                      |               |
| throttleTime | <code>number</code> \| <code>null</code> | <code></code> |

<a name="Mappr+maybeUpdateElements"></a>

### mappr.maybeUpdateElements(prevElements, elements)

Checks for changes in provided elements
and updates them based on edit mode

**Kind**: instance method of [<code>Mappr</code>](#Mappr)

| Param        | Type                |
| ------------ | ------------------- |
| prevElements | <code>object</code> |
| elements     | <code>object</code> |

<a name="Mappr+getRelativeMousePosition"></a>

### mappr.getRelativeMousePosition(mouseX, mouseY) ⇒ <code>Object</code>

Calculates relative mouse position against container

**Kind**: instance method of [<code>Mappr</code>](#Mappr)

| Param  | Type                |
| ------ | ------------------- |
| mouseX | <code>number</code> |
| mouseY | <code>number</code> |

<a name="Mappr+calculateNewElementPosition"></a>

### mappr.calculateNewElementPosition(previousCoords, nextCoords, vertices) ⇒ <code>Object</code>

Calculates new element vertices coordinates
based on mouse position change

**Kind**: instance method of [<code>Mappr</code>](#Mappr)

| Param          | Type                |
| -------------- | ------------------- |
| previousCoords | <code>Object</code> |
| nextCoords     | <code>Object</code> |
| vertices       | <code>Object</code> |

<a name="Mappr+getNewId"></a>

### mappr.getNewId() ⇒ <code>string</code>

Creates unique id

**Kind**: instance method of [<code>Mappr</code>](#Mappr)  
<a name="Mappr+renderElementActions"></a>

### mappr.renderElementActions()

Renders element actions menu

**Kind**: instance method of [<code>Mappr</code>](#Mappr)  
<a name="Mappr+renderDeleteWindow"></a>

### mappr.renderDeleteWindow(cancelDelete, confirmDelete) ⇒ <code>React.ReactElement</code>

Default edit window

**Kind**: instance method of [<code>Mappr</code>](#Mappr)

| Param         | Type                  |
| ------------- | --------------------- |
| cancelDelete  | <code>function</code> |
| confirmDelete | <code>function</code> |

<a name="Mappr+render"></a>

### mappr.render() ⇒ <code>React.ReactElement</code>

Render method

**Kind**: instance method of [<code>Mappr</code>](#Mappr)  
<a name="MapprProps"></a>

## MapprProps

**Kind**: global typedef  
**Properties**

| Name                  | Type                                       | Default            | Description                                                                                 |
| --------------------- | ------------------------------------------ | ------------------ | ------------------------------------------------------------------------------------------- |
| image                 | <code>string</code>                        |                    | Image to map over                                                                           |
| [elements]            | <code>Object.&lt;string, Object&gt;</code> |                    | Elements to render on image map                                                             |
| [editMode]            | <code>boolean</code>                       | <code>false</code> | Edit mode suggests whether to render Mappr with editing capabilities, or not                |
| [className]           | <code>string</code>                        |                    | Additional class name to assign to Mappr element (it has mappr class assigned by default)   |
| [onElementClick]      | <code>function</code>                      |                    | Callback prop which should handle click on element in live mode (editMode=false)            |
| [renderEditWindow]    | <code>function</code>                      |                    | Callback prop which should output edit window layout in edit mode                           |
| [renderDeleteWindow]  | <code>function</code>                      |                    | Callback prop which should output element delete window layout in edit mode                 |
| [onElementMouseOver]  | <code>function</code>                      |                    | Callback prop which should handle element(s) mouse over event in live mode (editMode=false) |
| [onElementMouseMove]  | <code>function</code>                      |                    | Callback prop which should handle element(s) mouse move event in live mode (editMode=false) |
| [onElementMouseOut]   | <code>function</code>                      |                    | Callback prop which should handle element(s) mouse over event in live mode (editMode=false) |
| [getElementsOnChange] | <code>function</code>                      |                    | Callback prop which is called with updated elements in edit mode (editMode=true)            |
| [defaultElementProps] | <code>Object</code>                        |                    | Properties to be assigned to every new element, created in edit mode                        |

**Example**

```js
<Mappr />
```
