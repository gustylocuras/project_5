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






            // .nodes(this.state.circles)
            // .force("x", d3.forceX(width / 2))
            // .force("y", d3.forceY(height / 2))
            //
            // .on("tick", function() {
            //   this.state.circles.map((circle) => {
            //     circle.attr("cx", function(d){ return d.x })
            //           .attr("cy", function(d){ return d.y })
            //   })
            // })
            // this.setState({circles: circles})



  componentDidMount(){
    const { countries } = this.state

    const casesMinMax = d3.extent(countries, (d) => { return d.cases})
    const deathsMinMax = d3.extent(countries, (d) => { return d.deaths})
    console.log(deathsMinMax, casesMinMax);

    //update scales with domain
    this.circleRadiusScale.domain(casesMinMax)
    this.colorScale.domain(deathsMinMax)

    const chart = d3.select('.chart')
        .attr('width', width)
        .attr('height', height);

        //Creating tooltip
          const tooltip = d3.select('.container')
            .append('div')
            .attr('class', 'tooltip')
            .html('Tooltip');

    const force = d3.forceSimulation()
                    .force("charge", d3.forceManyBody())
                    .force('collide', d3.forceCollide())
                    .force('center', d3.forceCenter(width / 2, height / 2))
                    .force("y", d3.forceY(0))
                    .force("x", d3.forceX(0));

                    const dragStart = d => {
                      if (!d3.event.active) force.alphaTarget(0.3).restart();
                      d.fx = d.x;
                      d.fy = d.y;
                    };
                    const drag = d => {
                      d.fx = d3.event.x;
                      d.fy = d3.event.y;
                    };
                    const dragEnd = d => {
                      if (!d3.event.active) force.alphaTarget(0);
                      d.fx = null;
                      d.fy = null;
                    }
                    const circles = d3.select('.chartContainer')
                        .selectAll('circle')
                        .data(countries).enter()
                        .append('circle')
                        .attr("r", d => { return this.circleRadiusScale(d.cases)})
                        .attr("fill", d => { return this.colorScale(d.deaths)})
                        .call(d3.drag()
                         .on('start', dragStart)
                         .on('drag', drag)
                         .on('end', dragEnd))
                         .on('mouseover',d => {
                          tooltip.html(d.country)
                            .style('left', d3.event.pageX + 5 +'px')
                            .style('top', d3.event.pageY + 5 + 'px')
                            .style('opacity', .9);
                        }).on('mouseout', () => {
                          tooltip.style('opacity', 0)
                            .style('left', '0px')
                            .style('top', '0px');
                        });

                    const ticked = () => {
                      circles
                      console.log(d.y, d.x);
                      .attr("cx", function(d) { return d.x; })
                      .attr("cy", function(d) { return d.y; })

                        };


                    //Starting simulation
                      force.nodes(countries)
                        .on('tick', ticked);
                    // = countries.map((d) => {
                    //   const countryCircleRadius = this.circleRadiusScale(d.cases)
                    //   const countryCircleColor = this.colorScale(d.deaths)
                    //   return {
                    //     r: countryCircleRadius,
                    //     color: countryCircleColor
                    //   }
                    // })






}




// componentWillUnmount(){
//   this.force().stop();
// }

  render() {


    return(
      <div className='container'>
        <h1>Graph</h1>
        <div className='chartContainer'>
          <svg  className='chart'>
          </svg>
        </div>
      </div>

    )

  }

}

export default Spheres;
