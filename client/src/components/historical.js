import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import _ from 'lodash'

const width = 650;
const height = 400;
const margin = {top:20, right: 5, bottom: 20, left: 35}



function Historical ({ historical, country }) {
const [casesLine, setCasesLine] = useState()
const [deathsLine, setDeathsLine] = useState()
const [recoveredLine, setRecoveredLine] = useState()

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
    const lines = []
   for(let object in currentCountry.timeline){
     let lineData = currentCountry.timeline[object]

     if(lineData !== 'timeline'){
       console.log(Object.keys(lineData));
       console.log(lineData)
       const timeDomainMax = Object.keys(lineData).length-1
       console.log(timeDomainMax);
       const populationDomain = d3.extent(Object.values(lineData))
       console.log(populationDomain);
       let day = 0
       for(let i = 0; i < Object.keys(lineData).length; i++){

         if(day < Object.keys(lineData).length){
           day++
           const eachLine = {
             day: day,
             number: Object.values(lineData)[i]
           }
           lines.push(eachLine)
         } else {
           day = 1
          }
       }
       console.log(lines);
       const casesLineData = lines.slice(0,lines.length/3)
       const deathsLineData = lines.slice((lines.length/3), (lines.length/3)*2 )
       const recoveredLineData = lines.slice((lines.length/3)*2, lines.length)
       console.log(casesLineData, deathsLineData, recoveredLineData);
       const xScale = d3.scaleLinear().range([margin.left, width - margin.right]).domain([1, timeDomainMax])
       const yScale = d3.scaleLinear().range([width / 2, 0]).domain(populationDomain)



      const lineGenerator = d3.line().x(d => xScale(d.day))
                                     .y(d => yScale(d.number))



      setCasesLine(lineGenerator(casesLineData))
      setDeathsLine(lineGenerator(deathsLineData))
      setRecoveredLine(lineGenerator(recoveredLineData))
      const xAxis = d3.select('.xAxis')
                    .call(d3.axisBottom(xScale))

      const yAxis = d3.select('.yAxis')
                    .call(d3.axisLeft(yScale))


     }

 }
    // const timeDomain = d3.extent(historical, d => Object.keys(+d.timeline[population]))
// console.log(timeDomain);
//     const populationDomain = d3.extent(historical, d => Object.values(d.timeline[population]))
// console.log(populationDomain);



}, [historical, country])

  return(
    <div>
      <svg className="lines" width={width} height={height}>
        <path d={casesLine}  stroke='green' fill="none" />
        <path d={deathsLine} stroke='red' fill="none" />
        <path d={recoveredLine} stroke='blue' fill="none" />
        <g>
          <g className='xAxis' transform={`translate( 0 , ${height - margin.bottom})`} />
          <g className='yAxis' transform={`translate( ${margin.left} , 0)`} />
        </g>
      </svg>

    </div>
  )
}

export default Historical;
