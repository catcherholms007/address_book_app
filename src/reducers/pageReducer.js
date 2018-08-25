import Immutable from 'immutable';

import {
  CLOSE_CONTACT_FORM,
} from "../constants/page-constants";

const defaultValues = {
  nextRoute: null,
};

export default (state = Immutable.Map(defaultValues), action) => {
  console.log('state', state);
  switch (action.type) {

    case CLOSE_CONTACT_FORM:
      return state.withMutations((map) => {
        map.set('nextRoute', '/');
      });

    default:
      return state;
  }
};