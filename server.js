
//Dependencies
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema.js')
const cors = require('cors')
const app = express();


app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))



const PORT = process.env.PORT || 5000

//Listener
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
})
