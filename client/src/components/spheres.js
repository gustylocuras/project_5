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

    const casesMinMax = d3.extent(countries, (d) => { return d.cases})
    console.log(casesMinMax);
}
     return(
      <div>

      <svg></svg>
      </div>
    )
}

export default Spheres;
