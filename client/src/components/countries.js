import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Map from './map'
import data from './custom.json'

//Component Query
function Countries() {
const [property, setProperty] = useState("pop_est")
  // const COUNTRIES_QUERY = gql`
  //   query countriesQuery {
  //     countries {
  //       country
  //       countryInfo{
  //         lat
  //         long
  //       }
  //       cases
  //       todayCases
  //       deaths
  //       todayDeaths
  //       recovered
  //       todayRecovered
  //       active
  //       critical
  //       tests
  //       activePerOneMillion
  //       recoveredPerOneMillion
  //
  //     }
  //   }
  //
  //   `;
  //   const { loading, error, data } = useQuery(COUNTRIES_QUERY, { errorPolicy: 'all' });
  //
  //   if (loading) return 'Loading...';
  //   // if (error) console.log(error); return `Error! ${error}`;
  //   if(data) {
      return(
        <div>
          <h1>Countries</h1>
          <Map  data={data} property={property} />
          <select value={property} onChange={event => setProperty(event.target.value)}>
            <option value="pop_est">Population</option>
            <option value="name_len">Population</option>
            <option value="dgp_md_est">Population</option>
          </select>


        </div>
      )

    }




// }


export default Countries;
