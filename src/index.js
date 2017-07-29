import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';


render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root'),
);

console.log('1231232131')

if (module.hot) {
  module.hot.accept();

  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}
