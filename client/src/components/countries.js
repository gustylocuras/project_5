import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Map from './map'


//Component Query
function Countries() {

  const COUNTRIES_QUERY = gql`
    query countriesQuery {
      countries {
        country
        todayCases
      }
    }

    `;
    const { loading, error, data } = useQuery(COUNTRIES_QUERY, { errorPolicy: 'all' });

    if (loading) return 'Loading...';
    // if (error) console.log(error); return `Error! ${error}`;
    if(data) {
      return(
        <div>
          <h1>Countries</h1>
          <Map data={data} />
          <h1>{data.countries[0].country}</h1>


        </div>
      )

    }




}


export default Countries;
