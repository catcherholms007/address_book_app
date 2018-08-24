import Immutable from 'immutable';

import {
  CREATE_CONTACT,
  CREATE_CONTACT_SUCCESS,
  DELETE_CONTACT, DELETE_CONTACT_SUCCESS,
  GET_CONTACTS,
  UPDATE_CONTACT, UPDATE_CONTACT_SUCCESS
} from "../constants/contact-constants";
import httpReducerHandler, {clearErrors} from '../lib/http-reducer-handler'

export default (state = Immutable.Map({ data: [], loading: true }), action) => {
  switch (action.type) {

    case GET_CONTACTS:
      return httpReducerHandler(state, action);

    case CREATE_CONTACT:
      return state.withMutations((map) => {
        clearErrors(map);
        map.set('loading', true);
        if (action.error) {
          try {
            map.set('errorData', Immutable.fromJS(action.payload.body));
          } catch (err) {
            map.set('errorData', null);
          }
          map.set('error', Immutable.fromJS(action.payload));
        }
      });

    case CREATE_CONTACT_SUCCESS:
      return state.withMutations((map) => {
        clearErrors(map);
        map.set('loading', false);
        const newContact = {[action.payload.id]: action.payload.contact};
        map.update('data', data => data.merge(newContact))
      });

    case UPDATE_CONTACT:
      return httpReducerHandler(state, action);

    case UPDATE_CONTACT_SUCCESS:
      return state.withMutations((map) => {
        clearErrors(map);
        map.set('loading', false);
        map.update('data', data => data.set(action.payload.id, Immutable.fromJS(action.payload.contact)))
      });

    case DELETE_CONTACT:
      return httpReducerHandler(state, action);

    case DELETE_CONTACT_SUCCESS:
      return state.withMutations((map) => {
        clearErrors(map);
        map.set('loading', false);
        map.update('data', data => data.remove(action.payload.id));
      });

    default:                       return state;
  }
};