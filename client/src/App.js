import React from 'react';
// import Spheres from './components/spheres'
import Countries from './components/countries'
import Query from './components/query'
import Footer from './components/footer'
import Nav from './components/nav'


class App extends React.Component {
  render = () => {
    return(
      <div className="container">
        <Nav />
        <Countries />
        <Query />
        <Footer />



      </div>
    )
  }
}

export default App;
