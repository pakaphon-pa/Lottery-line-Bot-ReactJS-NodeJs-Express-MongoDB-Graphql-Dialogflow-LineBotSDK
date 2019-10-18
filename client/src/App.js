import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider , useQuery } from '@apollo/react-hooks'
import './App.css';

import Headerpage from './components/layout/Headerpage'
import QueryNumber from './components/QueryNumber'
import Announprize from './components/Announprize'

const client = new ApolloClient({
  uri:'http://localhost:5555/graphql'
})

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <Headerpage/><br/>
      {/* <h2> เลขทั้งหมด 🚀</h2>
      <QueryNumber/><br/> */}
      <Announprize/>
    </div>
  </ApolloProvider>
);


export default App;
