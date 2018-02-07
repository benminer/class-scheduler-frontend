import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider } from 'react-apollo';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { client } from './Apollo/apollo';

ReactDOM.render(
<ApolloProvider client={client}>
  <App />
</ApolloProvider>,
document.getElementById('root')

);
registerServiceWorker();
