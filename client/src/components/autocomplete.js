import React, { useState, useEffect } from 'react';


function AutoComplete({ historical, getCountry}){
  const [options, setOptions] = useState([])


const countriesNames = []

 for(let country of historical){
   let countryName = country.country.toLowerCase()
    countriesNames.push(countryName);
  }

function getOptions(event){
  const entry = event.target.value.toLowerCase()
  const list = []
  for(let name of countriesNames){
    if(name.includes(entry)){
      list.push(name)
    }
  }
  const completeOptions = []
  if(list.length <= 7){
    for(let countryName of list){
      let array = countryName.split('')
      let first = array[0].toUpperCase()
       array.shift()
      let fileName = first.concat(array).replace(/,/g, '')
      completeOptions.push(fileName)
    }
  } console.log(completeOptions);setOptions(completeOptions);

}
console.log(options);

  return(
    <>
      <input onChange={getOptions} type='text' placeholder='Country'/><br/>
      <ul> {options.map((option, key) => {
        
        return <li className='options' key={key}>{option}</li>
      })}
      </ul>
    </>
  )
}

export default AutoComplete;
