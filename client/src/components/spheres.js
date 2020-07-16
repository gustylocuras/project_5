import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import _ from 'lodash';
import * as d3 from "d3";


function Spheres () {

  const COUNTRIES_QUERY = gql`
    query countriesQuery {
      countries {
        country
        cases
        todayCases
        deaths
        todayDeaths
        recovered
        todayRecovered
        active
        critical
        tests

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
    console.log(countries);

    const width = 1200
    const height = 800;
    const svg = d3.select("svg")
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height);

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

    const countriesCircles = _.map(countries, d=> {
      const countryCircleSize = circleRadiusScale(d.cases)
      const countryCircleColor = colorScale(d.deaths)

      return {
        countryCircleSize,
        countryCircleColor
      }
    })




    console.log(countriesCircles);



    // cirles = svg.selectAll("circle")
    //             .data(countries)
    //             .enter()
    //             .append("circle")
    //             .attr("r", d => circleRadiusScale(d.cases))

}
     return(
      <div>

      <svg></svg>
      </div>
    )
}

export default Spheres;
