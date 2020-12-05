import React, { useState } from 'react';


function AutoComplete({ historical, getCountry, searchCountry}){
  const [options, setOptions] = useState([])
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

    Array.prototype.multiIndexOf = function (space) {
      var indexes = [];
      for (var i = this.length - 1; i >= 0; i--){
        if(this[i] === space){
          indexes.unshift(i)
        }
      }
      return indexes
    }

    const completeOptions = []
    let letterIndex;
    let first;
    let array;
    let next;
    let fileName;
    if(list.length <= 40){
      for(let countryName of list){
        array = countryName.split('')
        first = array[0].toUpperCase()
        next = array.multiIndexOf(" ")
        letterIndex = next.map((item) => {
          return item+1
        })
        for(let i = 0; i < letterIndex.length; i++){
          array[letterIndex[i]] = array[letterIndex[i]].toUpperCase()
        }
        array.shift()

        fileName = first.concat(array).replace(/,/g, '').replace(/And/g, 'and').replace(/The/g, 'the')
        completeOptions.push(fileName)
      }
      console.log(next);
      // console.log(letterIndex);
      console.log(completeOptions);
    } setOptions(completeOptions);

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
