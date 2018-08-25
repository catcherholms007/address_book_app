import {VIEW_EDIT_CONTACT_PAGE, VIEW_MAIN_PAGE, VIEW_NEW_CONTACT_PAGE} from "../constants/page-constants";

export default {

  viewMain() {
    return (dispatch) => {
      dispatch({type: VIEW_MAIN_PAGE});
    };
  },

  viewByStatus(isNew) {
    return (dispatch) => {
      dispatch({type: isNew ? VIEW_NEW_CONTACT_PAGE : VIEW_EDIT_CONTACT_PAGE});
    }
  }
};