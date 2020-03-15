/*****************************************************************************
 *
 * Mappr module
 *
 ****************************************************************************/

import React from 'react'
// import memoizeOne from 'memoize-one';
// import isEqual from 'lodash.isequal';
// import throttle from 'lodash.throttle';
// import { SketchPicker } from 'react-color';
import PropTypes from 'prop-types'

/**
 * Modal component
 *
 * @param {object} props
 */
export function Modal(props) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '0px',
        left: 'opx',
        width: '100%',
        height: '100%',
        color: props['font-color'] || '#000',
        backgroundColor: props['secondary-color'] || 'rgba(255, 255, 255, 0.7)',
      }}>
      {props.children}
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.any,
  'font-color': PropTypes.string,
  'secondary-color': PropTypes.string,
}

/**
 * Color component
 *
 * @param {object} props
 */
// function ColorEdit(props) {
//   const { name, value, infoText, active, updater, toggleActive } = props
//
//   return (
//     <section>
//       <p>{infoText}</p>
//       {active ? (
//         <div>
//           <SketchPicker
//             color={value}
//             onChangeComplete={color => updater(color.rgb)}
//           />
//           <button onClick={toggleActive}>Finish editing</button>
//         </div>
//       ) : (
//         <button onClick={toggleActive}>Edit</button>
//       )}
//     </section>
//   )
// }

/**
 * Range component
 *
 * @param {object} props
 */
// function RangeEdit(props) {
//   const {
//     name,
//     value: { min, max, value },
//     infoText,
//     active,
//     updater,
//     toggleActive,
//   } = props
//
//   return (
//     <section>
//       <p>{infoText}</p>
//       {active ? (
//         <div>
//           <input
//             type="range"
//             min={min}
//             max={max}
//             value={parseInt(value)}
//             onChange={e => updater({ min, max, value: e.target.value })}
//           />
//           <button onClick={toggleActive}>Finish editing</button>
//         </div>
//       ) : (
//         <button onClick={toggleActive}>Edit</button>
//       )}
//     </section>
//   )
// }

/**
 * Text component
 *
 * @param {object} props
 */
// function TextEdit(props) {
//   const { name, value, infoText, active, updater, toggleActive } = props
//
//   const [colorPickerActive, toggleColorPicker] = useState(false)
//
//   const { value: textValue, color, x, y } = value
//
//   const textAlignStyle = {
//     width: '24px',
//     height: '22px',
//     padding: '3px 1px 4px 4px',
//     backgroundImage:
//       'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAABeQCAMAAAByzXKPAAAA1VBMVEUAAAAzMzIzMzIzMzE1NTUzMzIzMzIzMzEzMzIyMjIzMzIzMzIzMzIzMzE6OjoyMjIzMzIzMzIzMzEzMzI0NDA0NDIwMDAyMjEzMzIzMzEzMzE0NDAzMzMzMzIyMjIzMzI0NDE0NDQyMjIzMzIzMzIzMzIzMzM5OTkAAAC1tbX///9mZmYwMDAQEBAmJiZTiPJ7e3v/Z2RwcHAgICB+fn5hYWFzc3NAQECoqKiampqMjIxTU1NGRkY3NzcbGxsNDQ3w8PBQUFDg4ODAwMCwsLCgoKBPT09W+xp5AAAAKHRSTlMAh4DDEd187+mljnhvVge5nmhMQi4hA8uxk2IlHOOYc102M/jW088J/2liTQAACt5JREFUeNrs3O1um0AQheG5nIPCoIq1Q7+r/Mn9X1K9xtEAM9RLQmODzyO1cV+NtzjShhjHkRkAgn9DMCaYnRXIGOQdtWmk1zRWm0vNN6az+Y+v2fXZ5iTX/kZ4ZGvUNT6/RJuCM/VVRKFB7YBwtnY1k3h2wboaHy8RFQC2VGuc1D730WWLS2GIZ27aM4yUT+9tXaLNw9m0mI9uokepRLeC+ZyCfFCoqwckqV3WBHFZaxHLFrNxVpgUVRWjg/jli2WbfH4WyxYnWcVV0Rz7FYj26X9ezQcuE3VYkXzFSYpm9eq6pqSiuNYAaj+r0GiFxKv5tEOqxVfV0utrCkZF/HCXTuOdGz2IHKbDR5wdJ6PdeRmIsfviED0C5ZV7ojf487v59fPHsT18//a1Yn1HJdoSjIUXBG5XgaBejhMYVmT9B1dRUONj4KtyRHNmNkULDYeD2CGVjiZ0paOK1jVuYKIpjJTO7m9dovvEn3bz/DH4440f2+d9fvlVh+4LLuK6cM8GVcKKkmq3ZqqBfbhaef4n+pijBudNZH3H+OW3No+rbTmVXjfciPbs/GVQ7QU6tWqUW5lonefHfn5f6xI9DAxdqQU3n55uU821mj2ZuUq0SYo2ivA5tThxk3rK6u+urYtZiqKuGiWMEkbp4/OFLITIvyrfekt35WGvjvP6OlERwP6+VU39z+ansp+0SThP8jk+0SeoAehRjObmdha0f2YwfucMss7uaPVF3rThN/EH6fH3YhEt3bD1zMlwGtu8/8a5zrHJuR6NyrkKMK5N5qqf9ev6Y4hfGfSPrc7ZWZqPQrQPa+x5Cfe8FO55m3Xrcs8T3TFUYQ0zqj5jTPoMmagQz4brFh8D3x5L9OngyRy+IEa0JgBRlaBWAIJYyVYjYDF47PwNV/TwAIRfB+BiFcyeolchija6+P7xd//IveI+JlpwnrdZP7xexdD6/4N/PDzP06NZdc8vP4H7WKFXLbqjQcU9T7QZvFhHdN/+sndmy6lCQRQ9KOA8Ro1TxjttYuUlX5BK5f+/6YJIWjlNFREkpLJXGQuWO01e2mPaU4pA17qH7iEeKfRsrrqh4/t0hJQPEJSokULPFpJse0Iu0PNQNVSNnOu8ZHPWZc8TUhkBgECRikZMrp4Xq9W1NPubkIIUm4hnrtyikSIjq+jck3bOBQkpnSBrkU97ALl73pJqXfFc5AlJqN3cXvoTEKIzJcu5PSEFqHiGp6ahz+33Z3rWtpzhEfK16DO8XXi3S2vIvfUCHnpWrcsZHiHVAFUG0KQJoEgjGjGRFG1l9bq25gyPkIoANBcEab9DEPf27iCk40VbWa0uP86WkMsTQHPQHBSnJJHCytp1dW9Uz2cBQoo0PEqVes/r2bM0131CLtLzUCVUidw9n6uuaPY8IdnUYMet2BTccUtIfShnz60mBe65JaTunL/tVqTAbbeE1ImCc3vl16McIEiWc3tCClD5DM9Ak7ZFZCBkZEVzhkfI5/n6Hbdp+wF33BJSH8rZc6vISB/gnltCas/Z225FStdz2y0hZXE19lrt5p177NyR11+OHb/THhzJP86wP2uYrjvz1h92eTseNEzDbB2nd/OY1Py9WNw6/qjnN+fmvnmwnYkxjf1t+mAW7XlsbzaJ3a7DzH1sf3Udp7m/dcOf615sW26SdfvGrCaxbV4l9nEan0X0xqEaRrbvmnlrGFu3PTN3ndUoLOuapW8ODLzudLVomMHA71z/MwmT9mTmN+bOZnS9NcJDs+V53t+WPzQnbNa9/nRoCPl2AKqObKFvltEBoPvcVwNwmavxOy3IDwFAlkWCWPBqhJDC8GtsCPlGYI8ciQyRI+3/CLHHscysXvf0ynzWIOQsPr3wWllkxNQskD+b82/Ihi8qCCm150XpObXnc2RFs+cJqRhAE5AHpI8BOZbH5TQdlXB8JAUEIC4AvkFPSMEl/dQ+v74+2/bl6enFtm/v72+W/c/eHSW3CUNRGNZyjgiZNHE6fW2b6f63VGScCHSvI7CxjfH/tYnTU43CywFiAfnT/On+lunH3274R5G2zbv03rTj9F+z92+U7pqPX52PZjdM35uf6vxs3ofp799Kulf2B8CEc2JVjvJm6OIT5CO9PekvD/8T767XgTc2z1umnEdggyT5eX2s+k9yGpvH1kqvI523IVfSAzdlW2gbu3zn5+6j/JFcfIft0lBOi4/J6cbmBTZJTdPo9fV1/3pamqTUFCalOVkunVdNTU5bSa2Nn7ULjl0A7o5/aGt6Z6TKUpVC7/VLSrWzqTo7b+yzO+9i28shHtugl5cXXS9NLnyYHVZ+Nz79UG7y4in7Aqza9po+tBsXP1B8wCW3m01yVqq9G3w3q/X+/1lpZ5WEbKdOTnNsxiYtd+ngjl28Fw+zhwGwLA0/mDeIS46AxWnO2MVnUFD627+sasuAxyJpTsp3A+6WgnplGpILpL1JR21lZt5k2ZSrFPE41AteEy+Q9qrn58qW77lNM877sXXq+fcGLp/2giETZO5tTYumHObxKDQ0aezhxb2feNE0MWlvqZS1SzwsJZdslu3x9fYae8HFXYeAKcIVejxwzgwc0YE6jTzuWOAuqOS+GTY3rc+rmDxAKn7VEPAt+amm/7Yu8ev0gfnkHckljT8nSoaf/RkeNgUejaKburGiYt696FNIcXrt/3yJh8Qba+advg0BwJCk66Qamp3WvxtX1gMzSDZya+BU8y2OR+ogyk7w5h+Nox+/6S04pNunwKqpt9Db9yemA2GokjqThGR+ms1JeYMe92hu5y2Zbs5O5be7mkru2Hlpgc5j434M1NPiq0qqgXoaDkwqTU21V0s7dgY/TfLX9XMT1udx56RJqTqf5aqlR3vVqtOWaYpbp4NtW2tmPaXbwAZI0U1zroI/tiRW9oBVOtL5QT6uu2TH0nlgnXRSqsLkGXg+JnBTCjopVeGceXk2FnAtColkUynGMn1SrHXejq3Py4U5wHXZvtluJtXO27H+vFyMB9xElFIxNQ6fUmFj9Xm6Sr67SrA6b94Gfp4HLsb2rSM53VSMpseK1c7bsXbechs4zgO3EiUvs6kK7tgsUmlglaLkZiZVStzOBzoPrJHOS1VgVR5YuTPXz1VgXR5YM/+u9xglkyZRT2WqghlbnVc8CA+4mtxRp5vB7XxW7bw3LwvywI0pr5MN6HNNrUi/fUZO4o6tzxuiuO0GuLzUUdu3GOV3M6raeTu2Nm8aR+eBlVD1BnoVjowt0HBgnY51PrqdT/9yxtJ5YHWkeGKswoxJuMcGuIYoKdowKOQ4Xxov+4Zb/khU8Mf681a3gZ/0gYt1PjGdV1J2/mBS5z/58zrbQOeBE6zpGZgA7smRzgc6D2xKlORlCiUVKrfSslMAVulI56PX+XHv81g6D6yPFM+MVWCJDliLJdfoMhVYowPWYsk1ukwF1uiAu1R/Hh5v2wNb8r+9O0pBGAaiKLqdm/1vUCiFSCdhTIjWhntAwefY5sMxRW1ToJnZ89KjQTnuGzGUWB1DLkJtul0ofocn3SOf5wMu3mu97q30GN2e99he2gKEpj6Dkvwjj4tebb5d8EBAuhuUJJ87f96f4aT/1OlNz7GRfgg+WheCUFsfE16cpEFNx5exIUmHx09zd34AaRdACCDp+TVLSlFv1blzgKR2egx5zx/see0pn+djbR4FIVofz4/UeV67G3+vr3niC+H04Oz/nbwA7lqtm+wByfQAAAAASUVORK5CYII=)',
//     backgroundRepeat: 'no-repeat',
//   }
//
//   const textAlignUpdater = (prop, val) => e => {
//     e.preventDefault()
//     console.log(prop, val)
//     const newValue = { ...value }
//     newValue[prop] = val
//     updater(newValue)
//   }
//
//   return (
//     <section>
//       <p>{infoText}</p>
//       {active ? (
//         <div>
//           <section>
//             <p>Enter text</p>
//             <input
//               type="text"
//               value={textValue}
//               onChange={e => {
//                 const newValue = { ...value }
//                 newValue.value = e.target.value
//                 updater(newValue)
//               }}
//             />
//           </section>
//           <section>
//             <p>Set text color</p>
//             {colorPickerActive ? (
//               <div>
//                 <SketchPicker
//                   color={color || '#ffffff'}
//                   onChangeComplete={color => {
//                     const newValue = { ...value }
//                     newValue.color = color.rgb
//                     updater(newValue)
//                   }}
//                 />
//                 <button
//                   onClick={e => {
//                     e.preventDefault()
//                     toggleColorPicker(!colorPickerActive)
//                   }}>
//                   Close color picker
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={e => {
//                   e.preventDefault()
//                   toggleColorPicker(!colorPickerActive)
//                 }}>
//                 Open color picker
//               </button>
//             )}
//           </section>
//           <section>
//             <p>Align text</p>
//             <p>
//               Horizontally
//               <button
//                 onClick={textAlignUpdater('x', 'start')}
//                 style={{
//                   ...textAlignStyle,
//                   backgroundPosition: '0 -505px',
//                 }}></button>
//               <button
//                 onClick={textAlignUpdater('x', 'middle')}
//                 style={{
//                   ...textAlignStyle,
//                   backgroundPosition: '0 -138px',
//                 }}></button>
//               <button
//                 onClick={textAlignUpdater('x', 'end')}
//                 style={{
//                   ...textAlignStyle,
//                   backgroundPosition: '0 -689px',
//                 }}></button>
//             </p>
//             <p>
//               Vertically
//               <button
//                 onClick={textAlignUpdater('y', 'start')}
//                 style={{
//                   ...textAlignStyle,
//                   backgroundPosition: '0 -828px',
//                 }}></button>
//               <button
//                 onClick={textAlignUpdater('y', 'middle')}
//                 style={{
//                   ...textAlignStyle,
//                   backgroundPosition: '0 -552px',
//                 }}></button>
//               <button
//                 onClick={textAlignUpdater('y', 'end')}
//                 style={{
//                   ...textAlignStyle,
//                   backgroundPosition: '0 -92px',
//                 }}></button>
//             </p>
//           </section>
//           <button onClick={toggleActive}>Finish editing</button>
//         </div>
//       ) : (
//         <button onClick={toggleActive}>Edit</button>
//       )}
//     </section>
//   )
// }

/**
 * Component
 *
 * @param {object} props
 */
// function ElementEdit(props) {
//   const [state, setState] = useState({})
//
//   const hexToRgb = hex => {
//     const regex = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
//     let result = []
//     if (regex) {
//       for (let i = 1; i <= 3; i++) {
//         result.push(parseInt(regex[i], 16))
//       }
//     } else {
//       result = null
//     }
//     return result
//   }
//
//   const setupRBGAColor = (color, alpha) => {
//     let result
//     const colorSigns = ['r', 'g', 'b', 'a']
//     const rgba = hexToRgb(color)
//     if (rgba) {
//       rgba.push(parseFloat(alpha))
//       result = rgba.reduce((color, colorStop, index) => {
//         color[colorSigns[index]] = colorStop
//         return color
//       }, {})
//     } else {
//       // Fallback to white
//       result = {
//         r: 255,
//         g: 255,
//         b: 255,
//         a: 1,
//       }
//     }
//
//     return result
//   }
//
//   useEffect(() => {
//     setupState(props.whatToUpdate)
//   }, [])
//
//   const setupState = whatToUpdate => {
//     const newState = whatToUpdate.reduce((newState, updateObject) => {
//       newState[updateObject.name] = {
//         ...updateObject,
//         value: updateObject.initialValue,
//         active: false,
//       }
//
//       return newState
//     }, {})
//
//     return setState(newState)
//   }
//
//   const toggleActive = name => e => {
//     e.preventDefault()
//
//     const current = state[name]
//     const updated = { ...current, active: !current.active }
//
//     setState(state => ({ ...state, [name]: updated }))
//   }
//
//   const onUpdate = name => newValue => {
//     const { updater } = props
//     const current = state[name]
//     const updated = { ...current, value: newValue }
//     // Update local state
//     setState(state => ({ ...state, [name]: updated }))
//     // Call provided updater
//     const { type, value } = updated
//     updater({
//       type,
//       name,
//       value,
//     })
//   }
//
//   /**
//    * Setups layout based on current state
//    *
//    * @return {React.ReactElement}
//    */
//   const setupLayout = () => {
//     const whatToRender = Object.values(state).map(updateObject => {
//       const { type, name, active } = updateObject
//
//       switch (type) {
//         case 'color':
//           return (
//             <ColorEdit
//               key={name}
//               {...updateObject}
//               updater={onUpdate(name)}
//               toggleActive={toggleActive(name)}
//             />
//           )
//         case 'text':
//           return (
//             <TextEdit
//               key={name}
//               {...updateObject}
//               updater={onUpdate(name)}
//               toggleActive={toggleActive(name)}
//             />
//           )
//         case 'range':
//           return (
//             <RangeEdit
//               key={name}
//               {...updateObject}
//               updater={onUpdate(name)}
//               toggleActive={toggleActive(name)}
//             />
//           )
//         default:
//           return null
//       }
//     })
//
//     return (
//       <div>
//         <section>{whatToRender}</section>
//         <button
//           onClick={e => {
//             e.preventDefault()
//             props.closeWindow()
//           }}>
//           Close window
//         </button>
//       </div>
//     )
//   }
//
//   const { style = {}, defaultStyle } = props
//   // const { showColor, showBorder } = state;
//
//   // const updateColor = updater('fill');
//   // const updateBorderColor = updater('stroke');
//
//   return <Modal>{setupLayout()}</Modal>
// }

// export default ElementEdit
