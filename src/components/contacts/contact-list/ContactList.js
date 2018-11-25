import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {inject, observer} from 'mobx-react';

import ContactListItem from "./contact-list-item/ContactListItem";
import SearchField from "../search/SearchField";

import './styles.css';

class ContactList extends Component {

  render() {
    const {contacts, filterResult, filterQuery} = this.props.contactStore;
    console.log('contacts', this.props.contactStore.contacts);
    return (
      <div className={'contact-list'}>
        <SearchField/>
        <div className={'contact-list__content'}>
          {(filterQuery !== ''
            ? filterResult
            : contacts)
            .map(elem => (
              <ContactListItem
                id={elem.id}
                name={elem.name}
                key={'contact-list-item' + elem.id}
                email={elem.email}
              />
            ))}
          <NavLink
            to={'/new'}
          >
            <button className={'contact-list__add-button'}>{'+'}</button>
          </NavLink>
        </div>
      </div>
    )
  }
}

export default inject('contactStore')(observer(ContactList));