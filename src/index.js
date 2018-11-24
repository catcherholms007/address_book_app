import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import store from './redux/store';
import registerServiceWorker from './registerServiceWorker';
import {HashRouter as Router} from "react-router-dom";

let basename = '/address_book_app';
if (process.env.NODE_ENV !== 'production') {
  basename = '/'
}

ReactDOM.render(
  <Router basename={basename}>
    <Provider store={store}>
      <App/>
    </Provider>
  </Router>
  , document.getElementById('root'));
registerServiceWorker();
