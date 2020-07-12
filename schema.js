
const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema, GraphQLList, GraphQLFloat, GraphQLNonNull} = require('graphql');
const axios = require('axios');
const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');


const StatesType = new GraphQLObjectType({
  name: 'states',
  fields: () => ({
    state: {type: GraphQLString},
    cases: {type: GraphQLInt},
    todayCases: {type: GraphQLInt},
    deaths: {type: GraphQLInt},
    todayDeaths: {type: GraphQLInt},
    active: {type: GraphQLInt},
    tests: {type: GraphQLInt},
    testsPerOneMillion: {type: GraphQLFloat}

  })
})


const CountriesType = new GraphQLObjectType({
  name: 'countries',
  fields: () => ({
    country: {type: GraphQLString},
    countryInfo: {type: CountryInfoType},
    todayCases: {type: GraphQLInt},
    deaths: {type: GraphQLInt},
    todayDeaths: {type: GraphQLInt},
    recovered: {type: GraphQLInt},
    todayRecovered: {type: GraphQLInt},
    active: {type: GraphQLInt},
    critical: {type: GraphQLInt},
    tests: {type: GraphQLInt},
    activePerOneMillion: {type: GraphQLFloat},
    recoveredPerOneMillion: {type: GraphQLFloat}


  })
})

const CountryInfoType = new GraphQLObjectType({
  name: 'countryInfo',
  fields: () => ({
    lat: {type: GraphQLFloat},
    long: {type: GraphQLFloat}
  })
})

const HistoricalType = new GraphQLObjectType({
  name: "historical" ,
  fields: () => ({
    country: {type: GraphQLString},
    timeline: {type: TimelineType}
  })
})

const TimelineType = new GraphQLObjectType({
  name: 'timeline',
  fields: ()=> ({
    cases: {type: GraphQLJSONObject},
    deaths: {type: GraphQLJSONObject},
    recovered: {type: GraphQLJSONObject}
  })
})





//ROOT QUERY

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    state: {
      type: new GraphQLList(StatesType),
      resolve(parent, args) {
        return axios.get('https://disease.sh/v3/covid-19/states').then(
          res => res.data
        )
      }
    },
    countries: {
      type: new GraphQLList(CountriesType),
      resolve(parent, args) {
        return axios.get('https://disease.sh/v3/covid-19/countries').then(
          res => res.data

        )
      }
    },
    historical: {
      type: new GraphQLList(HistoricalType),
      resolve(parent, args) {
        return axios.get('https://disease.sh/v3/covid-19/historical?lastdays=all').then(
          res => res.data

        )
      }
    }
  }
})

// const CountriesRootQuery = new GraphQLObjectType({
//   name: 'CountriesRootQueryType',
//   fields: {
//     countries: {
//       type: new GraphQLList(CountriesType),
//       resolve(parent, args) {
//         return axios.get('https://disease.sh/v3/covid-19/countries').then(
//           res => res.data
//
//         )
//       }
//     }
//   }
// })
//
//
// const HistoricalRootQuery = new GraphQLObjectType({
//   name: 'HistoricalRootQueryType',
//   fields: {
//     historical: {
//       type: new GraphQLList(HistoricalType),
//       resolve(parent, args) {
//         return axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all').then(
//           res => res.data
//
//         )
//       }
//     }
//   }
// })



module.exports = new GraphQLSchema({
  query: RootQuery
})
