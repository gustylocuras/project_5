import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';



function Spheres () {

  const COUNTRIES_QUERY = gql`
    query countriesQuery {
      countries {
        country
        countryInfo{
          lat
          long
        }
        cases
        todayCases
        deaths
        todayDeaths
        recovered
        todayRecovered
        active
        critical
        tests
        activePerOneMillion
        recoveredPerOneMillion

      }
    }

    `;
    const { loading, error, data } = useQuery(COUNTRIES_QUERY, { errorPolicy: 'all' });

    if(loading) return "loading"
    // if (error) console.log(error); return `Error! ${error}`;
    if(data) return(
      <div>{data.countries[0].deaths}</div>
    )
}

export default Spheres;
