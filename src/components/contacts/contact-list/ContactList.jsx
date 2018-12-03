import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { boundMethod } from 'autobind-decorator';
import PropTypes from 'prop-types';

import ContactListItem from './contact-list-item/ContactListItem';
import ContactStore from '../../../stores/contactStore';
import PageStore from '../../../stores/pageStore';

import './styles.css';

class ContactList extends Component {
  @boundMethod
  onDeleteClick(id) {
    // TODO as one action via bus
    const { contactStore, pageStore } = this.props;
    contactStore.delete(id).then(() => {
      pageStore.closeContactForm();
    });
  }

  render() {
    const {
      contactStore: { actualContacts },
    } = this.props;
    return actualContacts.map(elem => (
      <ContactListItem
        id={elem.id}
        name={elem.name}
        key={`contact-list-item${elem.id}`}
        email={elem.email}
        onDeleteClick={this.onDeleteClick}
      />
    ));
  }
}

ContactList.propTypes = {
  contactStore: PropTypes.instanceOf(ContactStore).isRequired,
  pageStore: PropTypes.instanceOf(PageStore).isRequired,
};

export default inject('contactStore', 'pageStore')(observer(ContactList));
