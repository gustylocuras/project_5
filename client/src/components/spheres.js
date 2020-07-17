import React, { Component } from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import * as d3 from "d3";

const width = 960
const height = 500
const forceStrength = 0.05
const margin = {top: 20, right:10, bottom: 20, left: 35}
const circleSize = { min: 10, max: 80 };

class Spheres extends Component {

  state = {
    countries:this.props.data.countries,
    circles: []
  };

  circleRadiusScale = d3.scaleSqrt().range([circleSize.min, circleSize.max]);

  colorScale = d3.scaleLinear().range(["#ccc", "red"])

componentDidUpdate(){

  console.log(this.refs.circles);
  // const force = d3.forceSimulation()
  //           .nodes(this.refs.circle)
  //           .force("x", d3.forceX(width / 2))
  //           .force("y", d3.forceY(height / 2))
  //           .force("charge", d3.forceManyBody().strength(forceStrength))
  //           .on("tick", () => this.setState({circles}))
}


  componentDidMount(){
    const { countries } = this.state
    console.log(countries);
    const casesMinMax = d3.extent(countries, (d) => { return d.cases})
    const deathsMinMax = d3.extent(countries, (d) => { return d.deaths})
    console.log(deathsMinMax, casesMinMax);

    //update scales with domain
    this.circleRadiusScale.domain(casesMinMax)
    this.colorScale.domain(deathsMinMax)

    const circles = countries.map((d) => {
      const countryCircleRadius = this.circleRadiusScale(d.cases)
      const countryCircleColor = this.colorScale(d.deaths)
      return {
        r: countryCircleRadius,
        color: countryCircleColor
      }
    })
this.setState({circles})

}




// componentWillUnmount(){
//   this.force().stop();
// }

  render() {


    return(
      <div>
        <svg width={width} height={height}>
          {
            this.state.circles.map((d, key) => (<circle key={key}
                                        ref={circles => this.state.circles = circles}
                                        transform={`translate(150, 150)`}
                                        r={d.r}
                                        fill={d.color}
                                        />))
          }
        </svg>
     </div>

    )

  }

}

export default Spheres;
