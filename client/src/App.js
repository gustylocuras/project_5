import React from 'react';
// import Spheres from './components/spheres'
// import Countries from './components/countries'
import Query from './components/query'

import Nav from './components/nav'


class App extends React.Component {
  render = () => {
    return(
      <div className="container">
        <Nav />
        <Query />
      </div>
    )
  }
}

export default App;
