import {Fragment} from "react";
import {Route, withRouter} from "react-router-dom";
import ContactList from "./contacts/contact-list/ContactList";
import ContactFormLoader from "./contacts/contact-form/ContactFormLoader";
import React from "react";
import {withLoading} from "../hoc/withLoading";

function Router({match}) {
  return (
    <Fragment>
      <Route
        component={ContactList}
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