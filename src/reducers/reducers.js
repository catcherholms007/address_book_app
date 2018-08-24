import { combineReducers } from 'redux';

import contacts from './contactReducer';
import page from './pageReducer';

const reducers = combineReducers({
  contacts,
  page,
});

export default reducers;