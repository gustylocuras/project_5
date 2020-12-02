import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import _ from 'lodash'





function Historical ({ historical, country, windowSize }) {


const [casesLine, setCasesLine] = useState()
const [deathsLine, setDeathsLine] = useState()
const [recoveredLine, setRecoveredLine] = useState()

const [casesArea, setCasesArea] = useState()
const [deathsArea, setDeathsArea] = useState()
const [recoveredArea, setRecoveredArea] = useState()

const width = windowSize.width*0.8;
const height = windowSize.height*0.45;
// const correctionArea = width*0.0022;
const margin = {top:height*0.05, right: width*0.03, bottom: height*0.08, left: width*0.20}

//parses country to pass it as filter for historical array
let selected = historical.findIndex((d) => {
  return d.country === country
});

const currentCountry = historical[selected];


  useEffect(() => {

    const lines = []
   for(let object in currentCountry.timeline){
     let lineData = currentCountry.timeline[object]

     if(lineData !== 'timeline'){


       const timeDomainMax = Object.keys(lineData).length-1

       const populationDomain = d3.extent(Object.values(lineData))
       

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

       const casesLineData = lines.slice(0,lines.length/3)
       const deathsLineData = lines.slice((lines.length/3), (lines.length/3)*2 )
       const recoveredLineData = lines.slice((lines.length/3)*2, lines.length)

       const xScale = d3.scaleLinear().range([margin.left, width - margin.right]).domain([1, timeDomainMax*1.1])
       const yScale = d3.scaleLinear().range([height-margin.bottom, 20]).domain([populationDomain[0], populationDomain[1]*1.6])



      const lineGenerator = d3.line().x(d => xScale(d.day))
                                     .y(d => yScale(d.number))
      const area = d3.area().x(d => xScale(d.day))
                            .y0(height - margin.bottom)
                            .y1(d => yScale(d.number))

      setCasesArea(area(casesLineData))
      setDeathsArea(area(deathsLineData))
      setRecoveredArea(area(recoveredLineData))

      setCasesLine(lineGenerator(casesLineData))
      setDeathsLine(lineGenerator(deathsLineData))
      setRecoveredLine(lineGenerator(recoveredLineData))
      const xAxis = d3.select('.xAxis')
                    .call(d3.axisBottom(xScale))

      const yAxis = d3.select('.yAxis')
                    .call(d3.axisLeft(yScale))
     }

 }

}, [historical, country, windowSize])

  return(
    <div>
      <svg className="lines" width={width} height={height}>
        <path d={casesLine}  stroke='green' fill="none" />
        <path d={deathsLine} stroke='red' fill="none" />
        <path d={recoveredLine} stroke='blue' fill="none" />
        <path d={casesArea} fill='green' />
        <path d={recoveredArea} fill='blue' />
        <path d={deathsArea} fill='red' />
        <g>
          <g className='xAxis' transform={`translate( 0 , ${height - margin.bottom})`} />
          <g className='yAxis' transform={`translate( ${margin.left} , ${margin.top - margin.bottom})`} />
        </g>
      </svg>

    </div>
  )
}

export default Historical;
