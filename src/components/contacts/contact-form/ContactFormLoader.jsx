import React, { Component } from 'react';
import uuid from 'uuid/v4';
import { inject, observer } from 'mobx-react';

import ContactForm from './ContactForm';

import './styles.css';

class ContactFormLoader extends Component {
  state = {
    isNew: true,
    id: null,
  };

  componentDidMount() {
    const {
      pageStore,
      contactStore,
      match: {
        params: { contactId },
      },
    } = this.props;
    if (contactStore.contacts.some(element => element.id === contactId)) {
      pageStore.viewEditContactPage();
      this.setState({
        isNew: false,
        id: contactId,
      });
    } else if (contactId === 'new') {
      pageStore.viewNewContactPage();
      this.setState({
        isNew: true,
        id: uuid(),
      });
    }
  }

  componentWillUnmount() {
    const { contactStore, pageStore } = this.props;
    contactStore.research();
    pageStore.viewMainPage();
  }

  render() {
    const { id, isNew } = this.state;
    if (id) {
      return <ContactForm {...this.props} id={id} isNew={isNew} />;
    }
    return 'Not Found';
  }
}

export default inject('contactStore', 'pageStore')(observer(ContactFormLoader));
