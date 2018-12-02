import React from 'react';

import ContactListItem from './contact-list-item/ContactListItem';

import './styles.css';
import { inject, observer } from 'mobx-react';
// import withStorePropertyReloading from '../../../hoc/withStorePropertyReloading';
// import withArrayPropertyComparator from '../../../hoc/withArrayPropertyComparator';

// function ContactList({ contactStore, onDeleteClick }) {
//   console.log('ContactList.render');
//   return contactStore.actualContacts.map(elem => (
//     <ContactListItem
//       id={elem.id}
//       name={elem.name}
//       key={`contact-list-item_${elem.id}`}
//       email={elem.email}
//       onDeleteClick={onDeleteClick}
//     />
//   ));
// }
//
// export default inject('contactStore', 'pageStore')(
//   observer(withArrayPropertyComparator('contactStore', 'actualContacts', ContactList)),
// );
// export default withArrayPropertyComparator('contacts', ContactList);

function ContactList({ contactStore, onDeleteClick }) {
  console.log('ContactList.render');
  return contactStore.actualContacts.map(elem => (
    <ContactListItem
      id={elem.id}
      name={elem.name}
      key={`contact-list-item_${elem.id}`}
      email={elem.email}
      onDeleteClick={onDeleteClick}
    />
  ));
}

export default inject('contactStore', 'pageStore')(observer(ContactList));
