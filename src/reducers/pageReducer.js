import Immutable from 'immutable';

import {
  CLOSE_CONTACT_FORM, VIEW_EDIT_CONTACT_PAGE, VIEW_MAIN_PAGE, VIEW_NEW_CONTACT_PAGE,
} from "../constants/page-constants";

const defaultValues = {
  nextRoute: null,
  status: '',
};

export default (state = Immutable.Map(defaultValues), action) => {
  switch (action.type) {

    case CLOSE_CONTACT_FORM:
      return state.withMutations((map) => {
        map.set('nextRoute', '/');
      });

    case VIEW_MAIN_PAGE:
      return state.withMutations((map) => {
        map.set('status', '');
        map.set('nextRoute', null);
      });

    case VIEW_EDIT_CONTACT_PAGE:
      return state.withMutations((map) => {
        map.set('status', '/ Edit contact');
      });

    case VIEW_NEW_CONTACT_PAGE:
      return state.withMutations((map) => {
        map.set('status', '/ New contact');
      });

    default:
      return state;
  }
};