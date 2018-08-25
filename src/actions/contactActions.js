import ContactsAPI from '../api/contacts-api';
import {
  CLEAR_SEARCH,
  GET_CONTACTS,
  SEARCH_BY_CONTACTS,
  CREATE_CONTACT_SUCCESS,
  DELETE_CONTACT_SUCCESS,
  UPDATE_CONTACT_SUCCESS
} from "../constants/contact-constants";
import {CLOSE_CONTACT_FORM} from "../constants/page-constants";

export default {

  get() {
    return (dispatch) => {
      return ContactsAPI.get()
        .then((snapshot) => {
          if (snapshot) {
            dispatch({type: GET_CONTACTS, payload: snapshot.val()});
          }
        })
    };
  },

  create(id, contact) {
    return (dispatch) => {
      return ContactsAPI.create(id, contact)
        .then(() => {
          dispatch({type: CREATE_CONTACT_SUCCESS, payload: {id, contact}});
          dispatch({type: CLOSE_CONTACT_FORM});
        })
    };
  },

  update(id, contact) {
    return (dispatch) => {
      return ContactsAPI.update(id, contact)
        .then(() => {
          dispatch({type: UPDATE_CONTACT_SUCCESS, payload: {id, contact}});
          dispatch({type: CLOSE_CONTACT_FORM});
        })
    };
  },

  delete(id) {
    return (dispatch) => {
      return ContactsAPI.delete(id)
        .then(() => {
          dispatch({type: DELETE_CONTACT_SUCCESS, payload: {id}});
          dispatch({type: CLOSE_CONTACT_FORM});
        })
    };
  },

  search(query) {
    return (dispatch) => {
      if (query === '') {
        dispatch({type: CLEAR_SEARCH});
      }
      else {
        dispatch({type: SEARCH_BY_CONTACTS, payload: {query}});
      }
    }
  }

};