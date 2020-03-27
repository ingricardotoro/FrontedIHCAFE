import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.24.0/babel.js"></script>
<script type='text/babel'>
const JSX = (
    <div>
      <h1>Hello World</h1>
      <p>Lets render this to the DOM</p>
    </div>
  );
ReactDOM.render(<App />, document.getElementById('root'));
</script>

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

