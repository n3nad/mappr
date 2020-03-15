import React from 'react'
import PropTypes from 'prop-types'

function Vertex(props) {
  return <circle key={props.id} className="mappr__vertex" {...props} />
}

export default Vertex

Vertex.propTypes = {
  id: PropTypes.string.isRequired,
}
