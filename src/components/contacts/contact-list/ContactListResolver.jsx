import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { boundMethod } from 'autobind-decorator';

import ContactListItem from './contact-list-item/ContactListItem';

import './styles.css';
import withStorePropertyReloading from '../../../hoc/withStorePropertyReloading';
import ContactList from './ContactList';
// import ContactList from './ContactList';

// class ContactListChecker extends Component {
//   @boundMethod
//   onDeleteClick(id) {
//     // TODO as one action via bus
//     const { contactStore, pageStore } = this.props;
//     contactStore.delete(id).then(() => {
//       pageStore.closeContactForm();
//     });
//   }
//
//   render() {
//     const { contacts, filterResult, filterQuery } = this.props.contactStore;
//     const list = filterQuery !== '' ? (filterResult ? filterResult : contacts) : contacts;
//     return <ContactList contacts={list} onDeleteClick={this.onDeleteClick} />;
//   }
// }
//
// function shallowArrayEqual(prevProps, nextProps, propertyName) {
//   const prevProperty = prevProps[propertyName];
//   const nextProperty = nextProps[propertyName];
//   const prevPropertyLength = prevProperty.length;
//   const nextPropertyLength = nextProperty.length;
//   console.log(prevPropertyLength, nextPropertyLength);
//   console.log(prevProperty, nextProperty);
//   if (prevPropertyLength !== nextPropertyLength) return false;
//   for (let i = 0; i < prevPropertyLength; i++) {
//     const prevElement = prevProperty[i];
//     const nextElement = nextProperty[i];
//     const prevElementKeys = Object.keys(prevElement);
//     const prevElementKeysLength = prevElementKeys.length;
//     for (let j = 0; j < prevElementKeysLength; j++) {
//       const key = prevElementKeys[j];
//       if (!hasOwnProperty.call(nextElement, key)) {
//         return false;
//       }
//       if (prevElement[key] !== nextElement[key]) {
//         return false;
//       }
//     }
//   }
//   return true;
// }
//
// class ContactList extends Component {
//   // shouldComponentUpdate(nextProps) {
//   //   return !shallowArrayEqual(this.props, nextProps, 'contacts');
//   //   // return true;
//   // }
//
//   render() {
//     console.log('ContactList.render', this.props);
//     const { contacts, onDeleteClick } = this.props;
//     return contacts.map(elem => (
//       <ContactListItem
//         id={elem.id}
//         name={elem.name}
//         key={`contact-list-item${elem.id}`}
//         email={elem.email}
//         onDeleteClick={onDeleteClick}
//       />
//     ));
//   }
// }
//
// export default inject('contactStore')(observer(ContactListChecker));

class ContactListResolver extends Component {
  @boundMethod
  onDeleteClick(id) {
    // TODO as one action via bus
    const { contactStore, pageStore } = this.props;
    contactStore.delete(id).then(() => {
      console.log('ok');
      pageStore.closeContactForm();
    });
  }

  render() {
    const { actualContacts } = this.props.contactStore;
    console.log('ContactListResolver.render', actualContacts);
    // const list = filterQuery !== '' ? (filterResult ? filterResult : contacts) : contacts;
    return <ContactList contacts={actualContacts} onDeleteClick={this.onDeleteClick} />;
  }
}

export default inject('contactStore', 'pageStore')(observer(ContactListResolver));
