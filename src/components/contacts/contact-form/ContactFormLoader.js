import React, {Component} from 'react';
import uuid from 'uuid/v4';
import {inject, observer} from 'mobx-react';

import ContactForm from "./ContactForm";

import './styles.css';

class ContactFormLoader extends Component {

  state = {
    isNew: true,
    id: null,
  };

  componentDidMount() {
    const id = this.props.match.params.contactId;
    if (this.props.contactStore.contacts.some(element => element.id === id)) {
      this.setState({
        id: id,
        isNew: false,
      });
    }
    else if (id === 'new') {
      this.setState({
        isNew: true,
        id: uuid(),
      })
    }
  }

  componentWillUnmount() {
    this.props.contactStore.research();
  }

  render() {
    if (this.state.id) {
      return (
        <ContactForm
          {...this.props}
          id={this.state.id}
          isNew={this.state.isNew}
        />
      );
    }
    return 'Not Found';
  }
}

export default inject('contactStore', 'pageStore')(observer(ContactFormLoader));