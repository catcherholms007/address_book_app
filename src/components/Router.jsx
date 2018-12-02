import React, { Fragment } from 'react';
import withRouter from 'react-router-dom/withRouter';
import Route from 'react-router-dom/Route';
import ContactFormLoader from './contacts/contact-form/ContactFormLoader';
import ContactListBox from './contacts/contact-list/ContactListBox';
import withLoading from '../hoc/withLoading';

function Router({ match }) {
  return (
    <Fragment>
      <Route component={ContactListBox} path={`${match.url}/`} />
      <Route component={ContactFormLoader} path="/:contactId/" />
    </Fragment>
  );
}

export default withLoading(withRouter(Router));
