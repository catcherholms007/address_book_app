import Immutable from 'immutable';

import {GET_CONTACTS} from "../constants/contact-constants";
import httpReducerHandler from '../lib/http-reducer-handler'

export default (state = Immutable.Map({ data: [], loading: false }), action) => {
  switch (action.type) {
    case GET_CONTACTS:           return httpReducerHandler(state, action);
    default:                       return state;
  }
};