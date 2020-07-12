const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema, GraphQLList} = require('graphql');
const axios = require('axios');


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
    testsPerOneMillion: {type: GraphQLInt}

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
    activePerOneMillion: {type: GraphQLInt},
    recoveredPerOneMillion: {type: GraphQLInt}


  })
})

const CountryInfoType = new GraphQLObjectType({
  name: 'countryInfo',
  fields: () => ({
    lat: {type: GraphQLInt},
    long: {type: GraphQLInt}
  })
})

const HistoricalType = new GraphQLObjectType({
  name: 'historical',
  fields: () => ({
    country: {type: GraphQLString},
    timeline: {type: TimelineType}
  })
})

const TimelineType = new GraphQLObjectType({
  name: 'timeline',
  fields: ()=> ({
    cases: {type: GraphQLString},
    deaths: {type: GraphQLString},
    recovered: {type: GraphQLString}
  })
})



//ROOT QUERY

const StateRootQuery = new GraphQLObjectType({
  name: 'StateRootQueryType',
  fields: {
    states: {
      type: new GraphQLList(StatesType),
      resolve(parent, args) {
        return axios.get('https://disease.sh/v3/covid-19/states').then(
          res => res.data

        )
      }
    }
  }
})

const CountriesRootQuery = new GraphQLObjectType({
  name: 'CountriesRootQueryType',
  fields: {
    countries: {
      type: new GraphQLList(CountriesType),
      resolve(parent, args) {
        return axios.get('https://disease.sh/v3/covid-19/countries').then(
          res => res.data

        )
      }
    }
  }
})


const HistoricalRootQuery = new GraphQLObjectType({
  name: 'HistoricalRootQueryType',
  fields: {
    states: {
      type: new GraphQLList(HistoricalType),
      resolve(parent, args) {
        return axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all').then(
          res => res.data

        )
      }
    }
  }
})



module.exports = new GraphQLSchema({
  query: StateRootQuery
})

module.exports = new GraphQLSchema({
  query: CountriesRootQuery
})

module.exports = new GraphQLSchema({
  query: HistoricalRootQuery
})
