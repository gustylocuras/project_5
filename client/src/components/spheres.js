import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import * as d3 from "d3";


function Spheres () {
  const width = 1200
  const height = 800;
  const COUNTRIES_QUERY = gql`
    query countriesQuery {
      countries {
        country
        cases
        deaths
      }
    }

    `;
    const { loading, error, data } = useQuery(COUNTRIES_QUERY, { errorPolicy: 'all' });
    let d;

    // data = _.values(data)
    if(data){
      d = data.countries


    // if (error) console.log(error); return `Error! ${error}`;
    //=====================================================================================

     // React.useEffect(() => {
     //    setD(data.countries)
     //    return
     //   })


    //
    const countries = d



    // const svg = d3.select("svg")
    //               .append("svg")
    //               .attr("width", width)
    //               .attr("height", height);

    const circleSize = { min: 10, max: 80 };


    //create the domain
    const casesMinMax = d3.extent(countries, (d) => { return d.cases})
    const deathsMinMax = d3.extent(countries, (d) => { return d.deaths})

    //pass that to size and color
    const circleRadiusScale = d3.scaleSqrt()
                                .domain(casesMinMax)
                                .range([circleSize.min, circleSize.max]);

    const colorScale = d3.scaleLinear()
                          .domain(deathsMinMax)
                          .range(["#ccc", "red"])

    const countriesCirclesData = countries.map((d) => {
      const countryCircleRadius = circleRadiusScale(d.cases)
      const countryCircleColor = colorScale(d.deaths)
      const countryCircleCx = circleRadiusScale(d.cases)
      const countryCircleCy = circleRadiusScale(d.cases)
      return [countryCircleRadius, countryCircleCx, countryCircleCy, countryCircleColor]
    })

    console.log(countriesCirclesData);

    const countriesCircles =    d3.selectAll("circle")
                                .data(countriesCirclesData)
                                .enter()
                                .append('circle')
                                .attr("d", d => countriesCirclesData)
                                .attr("cx", d => d.countryCircleCx)
                                .attr("cy", d => d.countryCircleCy)
                                .attr("r", d => d.countryCircleRadius)
                                .attr("fill", d => d.countryCircleColor)
// d3.select('svg').append('g')

console.log(countriesCircles.data(countriesCirclesData));


}
     return(
      <div>

      <svg width={width} height={height}>
      <circle />
      </svg>
      </div>
    )
}

export default Spheres;
