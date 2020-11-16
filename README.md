# Covid-19 daily

### :computer: Creator:

- Agustin Alvarez

## About:

[COVID-19 daily](https://ronchon-monsieur-23040.herokuapp.com/) is a SPA that uses up to date data on the current Pandemic. The objective is to bring Data Analysis to everyone interested focusing on providing a user friendly interpretation.

## Features:

The user can:
- View and interact with geographic and public health data.


## Implements:
### Languages
- HTML5
- CSS3
- Javascript

### Technologies
- D3
- React
- GraphQL
- Apollo
- Heroku
- Node


## Installation Instructions:
- Clone or download the repo
- Open the project in terminal and your text editor
- npm i dependencies
- npm run dev (make sure ports 3000 and 5000 are available)


## Wins:
- At the very beginning my focus was on learning how to implement GraphQL in the correct way and that included learning how to implement Apollo as well. The documentation for both happens to be very clear in most of the steps although it is constantly updated. Using GraphiQL interface to build the queries really takes the experience of dealing with APIs to another level.
- Being able to customize the data display with D3 was highly encouraging and a good start in data visualization.


```Javascript
const CountriesType = new GraphQLObjectType({
  name: 'countries',
  fields: () => ({
    country: {type: GraphQLString},
    countryInfo: {type: CountryInfoType},
    cases: {type: GraphQLInt},
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



```

##  Struggles:
- Due to the frecuent update of Apollo packages there might be some patches in the source code that in my case made the error handling on the ApolloClient to trigger error messages. This is was happening during the implementation of useQuery hook from Apollo docs. importing gql was also problematic from the apollo boost package so I decided to import it from graphql-tag.
- As my second project using React I believe I need a lot more hours of practice to consistently operate functional components and hooks.
- The implementation of D3 and React and the question that says: "Who should manage the DOM?". The most popular method seems to be letting D3 do the math and React to render.



##  Future Features:
- Refactor refactor refactor and make the build process by D3 a reusable component and implement state updates with data changes.
