import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryConfigProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

import { configureStore } from './store';
import config from './config';

const store = configureStore();

const Root = ({ children }) => (
  <Provider store={store}>
    <BrowserRouter >
      <ReactQueryConfigProvider config={config.QUERY_CONFIG}>
        {children}
      </ReactQueryConfigProvider>
      <ReactQueryDevtools initialIsOpen />
    </BrowserRouter>
  </Provider>
);

Root.propTypes = {
  children: PropTypes.element,
};

export default Root;
