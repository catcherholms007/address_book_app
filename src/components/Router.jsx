import React, {Fragment} from "react";
import {Route, withRouter} from "react-router-dom";
import ContactFormLoader from "./contacts/contact-form/ContactFormLoader";
import ContactListBox from "./contacts/contact-list/ContactListBox";
import {withLoading} from "../hoc/withLoading";

function Router({match}) {
  return (
    <Fragment>
      <Route
        component={ContactListBox}
        path={`${match.url}/`}
      />
      <Route
        component={ContactFormLoader}
        path={`/:contactId/`}
      />
    </Fragment>
  );
}

export default  withLoading(withRouter(Router))