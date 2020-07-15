import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';


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
    if(data) return data
}

export default Query;
