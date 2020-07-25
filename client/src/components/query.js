import React, {useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Spheres from './spheres'
import Circles from './new_circles'

function Query(){
const [selection, setSelection] = useState()

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
    

return(
  <React.Fragment>
      <select value={selection} onChange={event => setSelection(event.target.value)}>
        <option value="cases">cases</option>
        <option value="recovered">today recovered</option>
        <option value="todayCases">today's cases</option>
        <option value="todayDeaths">today's deaths</option>
        <option value="todayTests">Tests</option>
        <option value="critical">Critical</option>

    </select>
    <Circles selection={selection} countries={data.countries} />

  </React.Fragment>
)

}




export default Query;
