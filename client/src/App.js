import React from 'react';
// import Spheres from './components/spheres'
import Countries from './components/countries'
import Query from './components/query'



class App extends React.Component {
  render = () => {
    return(
      <div className="container">
        <Countries />
        <Query />



      </div>
    )
  }
}

export default App;
