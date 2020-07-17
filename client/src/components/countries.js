import React, { useState } from 'react';
// import { useQuery } from '@apollo/react-hooks';
// import gql from 'graphql-tag';
import Map from './map'
import geojson from './custom.json'



//Component Query
function Countries() {

const [property, setProperty] = useState("pop_est")

      return(
        <div>

          <h1>Countries</h1>
          <Map  geojson={geojson} property={property} />
          <select value={property} onChange={event => setProperty(event.target.value)}>
            <option value="pop_est">Population</option>
            <option value="name_len">name length</option>
            <option value="dgp_md_est">GDP</option>
            <option value="cases">cases</option>
          </select>


        </div>
      )

    }




// }


export default Countries;
