import React, { PropTypes } from 'react';
import './style.less';


const App = () => {
  return (
    <div>
      hello world!
      <img src={require('./avatar.png')} />
    </div>
  )
};

export default App;
