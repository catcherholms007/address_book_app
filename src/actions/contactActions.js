import ContactsAPI from '../api/contacts-api';
import handleHttpAction from '../lib/handle-http-action';
import {
  CREATE_CONTACT_SUCCESS,
  DELETE_CONTACT_SUCCESS,
  GET_CONTACTS,
  UPDATE_CONTACT_SUCCESS
} from "../constants/contact-constants";
import {CLOSE_CONTACT_FORM} from "../constants/page-constants";

export default {

  get() {
    return (dispatch) => {
      return handleHttpAction(dispatch, GET_CONTACTS, ContactsAPI.get());
    };
  },

  create(id, contact) {
    return (dispatch) => {
      return ContactsAPI.create(id, contact)
        .then(() => {
            dispatch({ type: CREATE_CONTACT_SUCCESS, payload: {id, contact}});
            dispatch({ type: CLOSE_CONTACT_FORM});
        })
        .catch((err) => {
          console.log(err);
          // TODO handling request errors
        });
    };
  },

  update(id, contact) {
    return (dispatch) => {
      return ContactsAPI.update(id, contact)
        .then(() => {
          dispatch({ type: UPDATE_CONTACT_SUCCESS, payload: {id, contact}});
          dispatch({ type: CLOSE_CONTACT_FORM});
        })
        .catch((err) => {
          console.log(err);
          // TODO handling request errors
        });
    };
  },

  delete(id) {
      return (dispatch) => {
        return ContactsAPI.delete(id)
          .then(() => {
            dispatch({ type: DELETE_CONTACT_SUCCESS, payload: {id}});
            dispatch({ type: CLOSE_CONTACT_FORM});
          })
          .catch((err) => {
            console.log(err);
            // TODO handling request errors
          });
      };
  }
};