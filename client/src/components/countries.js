import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';



//Component Query
const COUNTRIES_QUERY = gql`
query countriesQuery {
  countries {
    todayCases
  }
}

`;

//Component
function Countries() {

    const { loading, error, data } = useQuery(COUNTRIES_QUERY, { errorPolicy: 'all' });

  if (loading) return 'Loading...';
  // if (error) console.log(error); return `Error! ${error}`;
  if (data) console.log(data);
    return(
      <div>
        <h1>Countries</h1>
        <h1>{data.countries[0].todayCases}</h1>
      </div>
    )

}


export default Countries;
