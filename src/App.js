import React from 'react'
import { hot } from 'react-hot-loader'

import Mappr from './Mappr'

class App extends React.Component {
  render() {
    return (
      <div>
        <header role="banner">
          <h1>Hello World.</h1>
        </header>
        <main role="main">
          <Mappr image="/assets/img.jpg" editMode={true} />
        </main>
      </div>
    )
  }
}

export default hot(module)(App)
