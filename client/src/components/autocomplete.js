import React, { useState, useEffect } from 'react';


function AutoComplete({ historical, getCountry}){
  const [options, setOptions] = useState([])
console.log(historical);

const countriesNames = []

 for(let country of historical){
    countriesNames.push(country.country);
  }

function getOptions(event){
  const entry = event.target.value
  const list = []
  for(let name of countriesNames){
    if(name.includes(entry)){
      list.push(name)
    }
  } console.log(list);
}


  return(
    <>
      <input onChange={getOptions} type='text' placeholder='Country'/><br/>
    </>
  )
}

export default AutoComplete;
