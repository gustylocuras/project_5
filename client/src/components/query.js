import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Spheres from './spheres'

function Query(){
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

    if (loading) return 'Loading...';
    // if (error) console.log(error); return `Error! ${error}`;
    if(data) console.log(data);

return(
  <React.Fragment>
    <Spheres data={data} />
  </React.Fragment>
)

}




export default Query;
