import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';

const width = 650;
const height = 400;
const margin = {top:20, right: 5, bottom: 20, left: 35}



function Historical ({ historical, country }) {
const [line, setLine] = useState()
let xAxisRef = useRef()
let yAxisRef = useRef()

//parses country to pass it as filter for historical array
let selected = historical.findIndex((d) => {
  return d.country === country
});

const currentCountry = historical[selected];



//
//   const dayCount = Object.keys(historical[selected].timeline[population]).length - 1;
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

  useEffect(() => {

   for(let object in currentCountry.timeline){
     let lineData = currentCountry.timeline[object]

     if(lineData !== 'timeline'){
       console.log(lineData)
       const timeDomainMax = Object.values(lineData)
       // console.log(timeDomainMax);
       const populationDomain = d3.extent(Object.keys(lineData))
       // console.log(populationDomain);
       const xScale = d3.scaleLinear().range([margin.left, width - margin.right]).domain([1, timeDomainMax])
       const yScale = d3.scaleLinear().range([0, width / 2]).domain(populationDomain)

       xAxisRef = d3.axisBottom().scale(xScale).tickFormat(d3.timeFormat('%b'))
       yAxisRef = d3.axisLeft().scale(yScale).tickFormat( d => `${d} cases`)

      const lineGenerator = d3.line().x(xScale([1, timeDomainMax]))
                                     .y( d => yScale(populationDomain))

      const line = lineGenerator(historical)
      setLine(line)


     }
console.log(line);

 }
    // const timeDomain = d3.extent(historical, d => Object.keys(+d.timeline[population]))
// console.log(timeDomain);
//     const populationDomain = d3.extent(historical, d => Object.values(d.timeline[population]))
// console.log(populationDomain);



}, [historical, country])

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
