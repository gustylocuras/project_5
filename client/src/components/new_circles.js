import React, { useEffect, useState} from 'react';
import * as d3 from 'd3';

const width = 900
const height = 550
const force = d3.forceSimulation()
const forceStrength = 0.12


const circleSize = { min: 6, max: 80 };

//geoprojection force
  let projectionStretchY = 0.15,
        projectionMargin = circleSize.max,
        projection = d3.geoEquirectangular()
            .scale((width / 2 - projectionMargin) / Math.PI)
            .translate([width / 2, height * (1 - projectionStretchY) / 3]);


function Circles ({countries, selection}){

  const [forces, setForces] = useState('center')


  // function getForceCenter(){
  //   console.log("use the force");
  //   setForces({
  //     x: d3.forceX(),
  //     y: d3.forceY()
  //   })
  //
  // }

  // const pepe = d3.forceX(countries, d =>{
  //   return projection([d.countryInfo.long, d.countryInfo.lat])
  // })
  //   console.log(projection([countries[0].countryInfo.long, countries[0].countryInfo.lat]))

  // function getForceCountries(){
  //   setForces({
  //     x: d3.forceX(countries, d =>{
  //       return projection(d.countryInfo.lat)
  //     }).strength(forceStrength),
  //
  //     y: d3.forceY(countries, d =>{
  //       return projection(d.countryInfo.long)
  //     }).strength(forceStrength)
  //   })
  // }

useEffect(() => {

  d3.selectAll('circle').remove()
  const feature = selection
  console.log(typeof feature);
  //setup domain for each vriable
    const selectionMinMax = d3.extent(countries, (d) => { return d[feature]})
    const deathsMinMax = d3.extent(countries, (d) => { return d.deaths})
    console.log(selectionMinMax);
//setup circle scale and color scale

  let circleRadiusScale = d3.scaleSqrt().domain(selectionMinMax).range([circleSize.min, circleSize.max]);
  let colorScale = d3.scaleSequential(d3.interpolateReds).domain(deathsMinMax)

  countries = countries.sort((a, b) =>
    b.cases - a.cases
  )

//setup the svg dimensions
  // const chart = d3.select('.chart')
  //   .attr('width', width)
  //   .attr('height', height);


//setup force layout
if(forces == 'center'){
  force .force('center', d3.forceCenter(width / 2, height / 2))
        .force("y", d3.forceY())
        .force("x", d3.forceX())
        .force('collide', d3.forceCollide().strength(0.5).iterations(5))
        .force("charge", d3.forceManyBody().strength((d) => {
          return  -Math.pow(circleRadiusScale(d[selection]), 2)  * forceStrength;
        }))
} else if(forces == 'countries'){
  force.force("x", d3.forceX( d => projection([d.countryInfo.long, d.countryInfo.lat])[0]).strength(0.4))
        .force("y", d3.forceY( d => projection([d.countryInfo.long, d.countryInfo.lat])[1]).strength(0.4))

}

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

    let circles = d3.select('.chart')
        .selectAll('circle')
        .data(countries).enter()
        .append('circle')
        .attr("r", d => { return circleRadiusScale(d[selection])})
        .attr("fill", d => { return colorScale(d.deaths)})
        .attr("stroke", "red" )
        .call(d3.drag()
         .on('start', dragStart)
         .on('drag', drag)
         .on('end', dragEnd))

         // .on('mouseover',showInfo)
        // .call(d3.zoom()
        //     .scaleExtent([1/ 2, 8])
        //     .on("zoom", zoomed))

        const ticked = () => {
          circles

          .attr("cx", function(d) { return d.x ; })
          .attr("cy", function(d) { return d.y ; })

            };
        force.nodes(countries)

            .on('tick', ticked)


}, [countries, selection, forces])


  return(
    <div className='container'>
      <div className='chartContainer'>
        <svg style={{height: "500px", width: "900px"}} className='chart'>
        </svg>
        <button onClick={() => setForces('countries')}>map</button>
        <button onClick={() => setForces('center')}>bubble</button>
      </div>
    </div>
  )
}

export default Circles;
