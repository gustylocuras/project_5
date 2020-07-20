import React, { Component } from 'react'
import * as d3 from "d3";

const width = 580
const height = 550
const forceStrength = 0.12


const circleSize = { min: 6, max: 80 };

class Spheres extends Component {

  state = {
    countries:this.props.data.countries,
    circles: []
  };

  circleRadiusScale = d3.scaleSqrt().range([circleSize.min, circleSize.max]);

  
  colorScale = d3.scaleSequential(d3.interpolateReds)

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
    let { countries } = this.state

    const casesMinMax = d3.extent(countries, (d) => { return d.cases})
    const deathsMinMax = d3.extent(countries, (d) => { return d.deaths})
    console.log(deathsMinMax, casesMinMax);

    //update scales with domain
    this.circleRadiusScale.domain(casesMinMax)
    this.colorScale.domain(deathsMinMax)

    const chart = d3.select('.chart')
        .attr('width', width)
        .attr('height', height);



    const force = d3.forceSimulation()
                    .force('center', d3.forceCenter(width / 2, height / 2))
                    .force("y", d3.forceY())
                    .force("x", d3.forceX())


                    countries = countries.sort((a, b) =>
                      b.cases - a.cases
                    )
                    const dragStart = d => {
                      if (!d3.event.active) force.alphaTarget(1).restart()
                      d.fx = d.x;
                      d.fy = d.y;
                    };
                    const drag = d => {
                      d.fx = d3.event.x;
                      d.fy = d3.event.y;
                    };
                    const dragEnd = d => {
                      if (!d3.event.active) force.alphaTarget(0.8);
                      d.fx = null;
                      d.fy = null;
                    }

                    const showInfo = d => {
                      d3.select(".title").html(d.country)
                      d3.select(".cases").html("Cases: " + d.cases)
                      d3.select(".deaths").html("Deaths: " + d.deaths)
                      d3.select(".todayCases").html("Today's Cases: " + d.todayCases)
                      d3.select(".todayDeaths").html("Today's Deaths: " + d.todayDeaths)
                      d3.select(".tests").html("Tests: " + d.tests)

                    }
                    const circles = d3.select('.chart')
                        .selectAll('circle')
                        .data(countries).enter()
                        .append('circle')
                        .attr("r", d => { return this.circleRadiusScale(d.cases)})
                        .attr("fill", d => { return this.colorScale(d.deaths)})
                        .attr("stroke", "red" )
                        .call(d3.drag()
                         .on('start', dragStart)
                         .on('drag', drag)
                         .on('end', dragEnd))
                         .on('mouseover',showInfo)


                    const ticked = () => {
                      circles
                      .attr("cx", function(d) { return d.x ; })
                      .attr("cy", function(d) { return d.y ; })

                        };


                    //Starting simulation
                      force.nodes(countries)
                        .force("charge", d3.forceManyBody().strength((d) => {
                          return -Math.pow(this.circleRadiusScale(d.cases), 2) * forceStrength;
                        }))
                      .force('collide', d3.forceCollide().strength(0.5).iterations(5))
                        .on('tick', ticked)


                    // = countries.map((d) => {
                    //   const countryCircleRadius = this.circleRadiusScale(d.cases)
                    //   const countryCircleColor = this.colorScale(d.deaths)
                    //   return {
                    //     r: countryCircleRadius,
                    //     color: countryCircleColor
                    //   }
                    // })
}


  render() {


    return(
      <div className='container'>
        <div className='chartContainer'>
          <svg className='chart'>
          </svg>
          <div className="tooltip">
            <h1 className="title">Country name</h1>
            <div className="data">
            <h3 className="cases">Cases</h3>
            <h3 className="deaths">Deaths</h3>
            <h3 className="todayCases">Today's cases</h3>
            <h3 className="todayDeaths">Today's deaths</h3>
            <h3 className="tests">Tests</h3>
            </div>

          </div>
        </div>

      </div>

    )

  }

}

export default Spheres;
