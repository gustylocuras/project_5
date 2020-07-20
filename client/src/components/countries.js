import React, { useState } from 'react';
// import { useQuery } from '@apollo/react-hooks';
// import gql from 'graphql-tag';
import Map from './map'
import geojson from './custom.json'



//Component Query
function Countries() {

const [property, setProperty] = useState("pop_est")

      return(
        <div className="map">
          <Map  geojson={geojson} property={property} />
            <select value={property} onChange={event => setProperty(event.target.value)}>
              <option value="pop_est">Population</option>
              <option value="name_len">name length</option>
              <option value="gdp_md_est">GDP</option>
          </select>
        </div>
      )

    }




// }


export default Countries;
