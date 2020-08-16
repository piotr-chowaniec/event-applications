import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryConfigProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

import App from './App';
import { queryConfig } from './config';

library.add(faUser, faEnvelope, faLock);

ReactDOM.render(
  <BrowserRouter >
    <ReactQueryConfigProvider config={queryConfig}>
      <App />
    </ReactQueryConfigProvider>
    <ReactQueryDevtools initialIsOpen />
  </BrowserRouter>,
  document.getElementById('root'),
);
