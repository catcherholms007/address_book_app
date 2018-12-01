import React from 'react';
import NavLink from "react-router-dom/NavLink";
import {inject, observer} from 'mobx-react';

import SearchField from "../search/SearchField";

import './styles.css';
import ContactList from "./ContactList";

function ContactListBox() {
  return (
    <div className={'contact-list'}>
      <SearchField/>
      <div className={'contact-list__content'}>
        <ContactList/>
        <NavLink to={'/new'}>
          <button className={'contact-list__add-button'}>{'+'}</button>
        </NavLink>
      </div>
    </div>
  )
}

export default inject('contactStore')(observer(ContactListBox));