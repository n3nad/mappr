// Types

/**
 * @typedef MapprProps
 *
 * @property {string} image - Image to map over
 * @property {Object<string, Object>} [elements] - Elements to render on image map
 * @property {boolean} [editMode=false] - Edit mode suggests whether to render Mappr with editing capabilities, or not
 * @property {string} [className] - Additional class name to assign to Mappr element (it has mappr class assigned by default)
 * @property {function} [onElementClick] - Callback prop which should handle click on element in live mode (editMode=false)
 * @property {renderEditWindow} [renderEditWindow] - Callback prop which should output edit window layout in edit mode
 * @property {function} [renderDeleteWindow] - Callback prop which should output element delete window layout in edit mode
 * @property {function} [onElementMouseOver] - Callback prop which should handle element(s) mouse over event in live mode (editMode=false)
 * @property {function} [onElementMouseMove] - Callback prop which should handle element(s) mouse move event in live mode (editMode=false)
 * @property {function} [onElementMouseOut] - Callback prop which should handle element(s) mouse over event  in live mode (editMode=false)
 * @property {function} [getElementsOnChange] - Callback prop which is called with updated elements in edit mode (editMode=true)
 * @property {Object} [defaultElementProps] - Properties to be assigned to every new element, created in edit mode
 */

/**
 * @callback renderEditWindow
 *
 * @param {Object} element - Element for which edit window is rendered
 * @param {function} saveProps - Element props save handler
 * @param {function} saveData - Element data save handler
 * @param {function} closeEditWindow - CLose edit window handler
 */

/**
 * @typedef {Object} MapprState
 *
 * @property {Object.<string, Object>} elements - Elements of usage
 * @property {string} lastAddedElementId - Currently in use for the purpose of default styles
 * @property {string} activeElementId
 * @property {string} clonedElementId
 * @property {boolean} elementEditInProgress
 * @property {boolean} elementCreateInProgress
 * @property {string} deleteElementId
 * @property {Object} elementDrag
 * @property {Object} vertexDrag
 * @property {boolean} showNonActiveElements
 * @property {boolean} showHandles
 */

module.exports = {}
