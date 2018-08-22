import { combineReducers } from 'redux';

import contacts from './contactReducer';

const reducers = combineReducers({
  contacts
});

export default reducers;