import React, { useState } from 'react';


function AutoComplete({ historical, getCountry, searchCountry}){
  const [options, setOptions] = useState([])
  console.log(historical);
  const countriesNames = []

 for(let country of historical){
     let countryName = country.country.toLowerCase()
      countriesNames.push(countryName);
  }

  function findDuplicates(name, arr){
    let result
    for(let i = 0; i < arr.length; i++){
      result = name == arr[i];
    }
     return !result ;
  }

  function getOptions(event){
    const entry = event.target.value.toLowerCase()
    const list = []
    for(let name of countriesNames){
      if(name.includes(entry)){
        if(findDuplicates(name, list) == true){
          if(name.length <= 3){

            list.push(name.toUpperCase())
          } else {

              list.push(name)
          }
        }

      }
    }
    console.log(list);
    const completeOptions = []
    if(list.length <= 40){
      for(let countryName of list){
        let array = countryName.split('')
        let first = array[0].toUpperCase()
         array.shift()
        let fileName = first.concat(array).replace(/,/g, '')
        completeOptions.push(fileName)
      }
    } setOptions(completeOptions);
    console.log(completeOptions);
}

  return(
    <React.Fragment>
      <input className='country-input' onChange={getOptions} type='text' placeholder='Country' />
      <ul> {options.map((option, key) => {
        return <li onClick={() => {
          getCountry(option)
          searchCountry()
          setOptions([])
        }} className='options' key={key}>{option}</li>
      })}
      </ul>
    </React.Fragment>
  )
}

export default AutoComplete;
