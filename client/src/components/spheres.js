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
    countries:[]
  };



  componentDidMount(){
    this.setState({
      countries: this.props.data.countries
    })
  }
  componentDidUpdate(){
    const { countries } = this.state
    console.log(countries);
    const casesMinMax = d3.extent(countries, (d) => { return d.cases})
    const deathsMinMax = d3.extent(countries, (d) => { return d.deaths})
    console.log(deathsMinMax, casesMinMax);

    //     //pass that to size and color
    const circleRadiusScale = d3.scaleSqrt()
                                  .domain(casesMinMax)
                                  .range([circleSize.min, circleSize.max]);

    const colorScale = d3.scaleLinear()
                            .domain(deathsMinMax)
                            .range(["#ccc", "red"])

    const countryCircleRadius = circleRadiusScale(d.cases)
    const countryCircleColor = colorScale(d.deaths)
    const countryCircleCx = circleRadiusScale(d.cases)
    const countryCircleCy = circleRadiusScale(d.cases)



    
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
                 <svg width={width} height={height}/>
               </div>

    )

  }

}

export default Spheres;
