import React, { Component } from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import * as d3 from "d3";

const width = 960
const height = 500
const margin = {top: 20, right:10, bottom: 20, left: 35}
const circleSize = { min: 10, max: 80 };

class Spheres extends Component {

  state = {
    countries:this.props.data.countries,
    circles: []
  };

  circleRadiusScale = d3.scaleSqrt().range([circleSize.min, circleSize.max]);

  colorScale = d3.scaleLinear().range(["#ccc", "red"])

  
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
//     const countries = d
///     //create the domain



//
//     const countriesCircles =    d3.selectAll("circle")
//                                 .data(countriesCirclesData)
//                                 .enter()
//                                 .append('circle')
//                                 .attr("d", d => countriesCirclesData)
//                                 .attr("cx", d => d.countryCircleCx)
//                                 .attr("cy", d => d.countryCircleCy)
//                                 .attr("r", d => d.countryCircleRadius)
//                                 .attr("fill", d => d.countryCircleColor)
// // d3.select('svg').append('g')
//
// console.log(countriesCircles.data(countriesCirclesData));


  render() {

    console.log(this.state.countries[0])
    return(
      <div>
        <svg width={width} height={height}>
          {
            this.state.circles.map(d=> (<circle r={d.r} fill={d.color}/>))
          }
        </svg>
     </div>

    )

  }

}

export default Spheres;
