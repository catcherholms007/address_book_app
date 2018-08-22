import ContactsAPI from '../api/contacts-api';
import handleHttpAction from '../lib/handle-http-action';
import {GET_CONTACTS} from "../constants/contact-constants";

export default {
  get() {
    return (dispatch) => {
      return handleHttpAction(dispatch, GET_CONTACTS, ContactsAPI.get());
    };
  }
};