const {GraphQLObjectType, GraphQLInt, GraphQLString} = require('graphql');

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
