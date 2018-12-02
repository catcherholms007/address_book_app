import React from 'react';
import { inject, observer } from 'mobx-react';

import ContactListItem from './contact-list-item/ContactListItem';

import './styles.css';

function ContactList(props) {
  const { contacts, filterResult, filterQuery } = props.contactStore;
  return (filterQuery !== '' ? filterResult : contacts).map(elem => (
    <ContactListItem
      id={elem.id}
      name={elem.name}
      key={`contact-list-item${elem.id}`}
      email={elem.email}
    />
  ));
}

export default inject('contactStore')(observer(ContactList));
