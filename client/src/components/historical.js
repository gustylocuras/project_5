import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';

const width = 650;
const height = 400;
const margin = {top:20, right: 5, bottom: 20, left: 35}



function Historical ({ historical, country }) {
const [line, setLine] = useState()
let xAxisRef = useRef()
let yAxisRef = useRef()


let selected = historical.findIndex((d) => {
  return d.country === country
});

console.log(historical[selected]);
//
//   const dayCount = Object.keys(historical[0].timeline[population]).length - 1;
// console.log(dayCount);
  // let days = []
  // let cases = []
  // const dataParser = historical.map((country) => {
  //   for(let [key, value] of Object.entries(country.timeline[population])){
  //     days.push(key)
  //     cases.push(value)
  //   }
  // })

// console.log(days, cases);

//   useEffect(() => {
//     // const timeDomain = d3.extent(historical, d => Object.keys(+d.timeline[population]))
// // console.log(timeDomain);
//     const populationDomain = d3.extent(historical, d => Object.values(d.timeline[population]))
// console.log(populationDomain);
//     const xScale = d3.scaleLinear().range([margin.left, width - margin.right]).domain([1, dayCount])
//     const yScale = d3.scaleLinear().range([0, width / 2]).domain(populationDomain)
//
//      xAxisRef = d3.axisBottom().scale(xScale).tickFormat(d3.timeFormat('%b'))
//      yAxisRef = d3.axisLeft().scale(yScale).tickFormat( d => `${d} cases`)
//
//     const lineGenerator = d3.line().x(xScale([1, dayCount]))
//                                    .y( d => yScale(Object.values(+d.timeline[population])))
//
//     const line = lineGenerator(historical)
//     setLine(line)
//
//
//   }, [historical, population])

  return(
    <div>
      <svg width={width} height={height}>

      </svg>
      <g>
        <g ref={xAxisRef} transform={`translate( 0 , ${height - margin.bottom})`} />
        <g ref={yAxisRef} transform={`translate( ${margin.left} , 0)`} />
      </g>
    </div>
  )
}

export default Historical;
