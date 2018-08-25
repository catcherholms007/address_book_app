import Immutable from 'immutable';

import {
  CLEAR_SEARCH,
  CREATE_CONTACT_SUCCESS,
  DELETE_CONTACT_SUCCESS,
  GET_CONTACTS, RESEARCH_BY_CONTACTS, SEARCH_BY_CONTACTS,
  UPDATE_CONTACT_SUCCESS
} from "../constants/contact-constants";
import httpReducerHandler, {clearErrors} from '../lib/http-reducer-handler';

const initialState = {
  data: [],
  loading: true,
  filterQuery: '',
  filterResult: [],
};

export default (state = Immutable.Map(initialState), action) => {
  switch (action.type) {

    case GET_CONTACTS:
      return httpReducerHandler(state, action);

    case CREATE_CONTACT_SUCCESS:
      return state.withMutations((map) => {
        clearErrors(map);
        map.set('loading', false);
        const newContact = {[action.payload.id]: action.payload.contact};
        map.update('data', data => data.merge(newContact))
      });

    case UPDATE_CONTACT_SUCCESS:
      return state.withMutations((map) => {
        clearErrors(map);
        map.set('loading', false);
        map.update('data', data => data.set(action.payload.id, Immutable.fromJS(action.payload.contact)))
      });

    case DELETE_CONTACT_SUCCESS:
      return state.withMutations((map) => {
        clearErrors(map);
        map.set('loading', false);
        map.update('data', data => data.remove(action.payload.id));
      });

    case SEARCH_BY_CONTACTS:
      return state.withMutations((map) => {
        const origin = action.payload.query;
        const query = origin.toLowerCase();
        map.set('filterQuery', origin);
        map.set('filterResult', map.get('data').filter(value => {
          return value.get('name').toLowerCase().includes(query) || value.get('email').toLowerCase().includes(query);
        }));
      });

    case CLEAR_SEARCH:
      return state.withMutations((map) => {
        map.set('filterQuery', '');
        map.set('filterResult', Immutable.fromJS([]));
      });

    case RESEARCH_BY_CONTACTS:
      return state.withMutations((map) => {
        const query = map.get('filterQuery');
        map.set('filterResult', map.get('data').filter(value => {
          return value.get('name').toLowerCase().includes(query) || value.get('email').toLowerCase().includes(query);
        }));
      });

    default:
      return state;
  }
};