import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

import App from './App';
import Root from './root';

library.add(faUser, faEnvelope, faLock);

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.getElementById('root'),
);
