import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

import App from './App';

library.add(faUser, faLock);

ReactDOM.render(
  <BrowserRouter >
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
