import React, {useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Circles from './new_circles'
import Historical from './historical'
import AutoComplete from './autocomplete'
import UseWindowSize from './windowResize'

function Query(){

let windowSize = UseWindowSize()


const [selection, setSelection] = useState('cases')
const [ country, setCountry ] = useState('USA')

let countryName;

function getCountry (option){
  countryName = option

}

function searchCountry(){
  if(countryName)
  setCountry(countryName)
}


  const COUNTRIES_QUERY = gql`
    query countriesQuery {
      historical{
                country
                timeline {
                  cases
                  deaths
                  recovered
                }
              }
      countries {
        countryInfo{
          lat
          long
        }
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
    <Circles windowSize={windowSize} selection={selection} setSelection={setSelection} countries={data.countries} />
    <AutoComplete windowSize={windowSize} searchCountry={searchCountry} getCountry={getCountry} historical={data.historical}/>
    <Historical windowSize={windowSize} country={country} historical={data.historical}/>
  </React.Fragment>
)

}

export default Query;
