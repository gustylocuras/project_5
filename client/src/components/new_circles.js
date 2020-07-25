import React, { useEffect} from 'react';
import * as d3 from 'd3';

const width = 580
const height = 550
const forceStrength = 0.12


const circleSize = { min: 6, max: 80 };

function Circles ({countries, selection}){

useEffect(() => {
//setup circle scale and color scale

  let circleRadiusScale = d3.scaleSqrt().range([circleSize.min, circleSize.max]);
  let colorScale = d3.scaleSequential(d3.interpolateReds)


//setup domain for each vriable
  const selectionMinMax = d3.extent(countries, (d) => { return d[selection]})
  const deathsMinMax = d3.extent(countries, (d) => { return d.deaths})


//update the scales with domains
   circleRadiusScale.domain(selectionMinMax)
   colorScale.domain(deathsMinMax)


//setup the svg dimensions
  const chart = d3.select('.chart')
    .attr('width', width)
    .attr('height', height);

    //define ticked for tick time of the force layout

    const ticked = (element) => {
      element
      .attr("cx", function(d) { return d.x ; })
      .attr("cy", function(d) { return d.y ; })

        };


//setup force layout
  const force = d3.forceSimulation()
                  .force('center', d3.forceCenter(width / 2, height / 2))
                  .force("y", d3.forceY())
                  .force("x", d3.forceX())
                  .force('collide', d3.forceCollide().strength(0.5).iterations(5))
                  .force("charge", d3.forceManyBody().strength((d) => {
                    return -Math.pow(this.circleRadiusScale(d[selection]), 2) * forceStrength;
                  }))
                  .on('tick', ticked)

    // setup the drag events

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


    //create the circles

    const circles = d3.select('.chart')
        .selectAll('circle')
        .data(countries).enter()
        .append('circle')
        .attr("r", d => { return this.circleRadiusScale(d[selection])})
        .attr("fill", d => { return this.colorScale(d.deaths)})
        .attr("stroke", "red" )
        .call(d3.drag()
         .on('start', dragStart)
         .on('drag', drag)
         .on('end', dragEnd))
         // .on('mouseover',showInfo)
        // .call(d3.zoom()
        //     .scaleExtent([1/ 2, 8])
        //     .on("zoom", zoomed))

})


  return(
    <div className='container'>
      <div className='chartContainer'>
        <svg className='chart'>
        </svg>
      </div>
    </div>
  )
}

export default Circles;
