import React from 'react';
import ReactDOM from 'react-dom';
// import 'jsdom-worker'
import {Provider} from "mobx-react";

import App from './App';
import ContactStore from "../stores/contactStore";
import PageStore from "../stores/pageStore";
import Worker from '../../__mocks__/Worker';
import URL from '../../__mocks__/URL';

const stores = {
  contactStore: new ContactStore(),
  pageStore: new PageStore()
};
window.Worker = Worker;
window.URL = URL;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider {...stores} >
      <App />
    </Provider>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});
