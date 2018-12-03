import React, { Component } from 'react';
import withRouter from 'react-router-dom/withRouter';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import Router from '../components/Router';
import ContactStore from '../stores/contactStore';

class BodyContent extends Component {
  componentDidMount() {
    const { contactStore } = this.props;
    contactStore.initWorker();
    contactStore.fetchContacts();
  }

  render() {
    const { contactStore } = this.props;
    return <Router loading={contactStore.loading} />;
  }
}

BodyContent.propTypes = {
  contactStore: PropTypes.instanceOf(ContactStore).isRequired,
};

export default withRouter(inject('contactStore', 'pageStore')(observer(BodyContent)));
