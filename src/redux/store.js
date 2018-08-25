import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers/reducers';

const initialState = reducers;

const middleware = [
  thunk
];

const composedEnhancers = compose(
  applyMiddleware(...middleware)
);

const store = createStore(
  initialState,
  composedEnhancers
);

export default store;