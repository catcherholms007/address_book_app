import React from 'react';
import NavLink from 'react-router-dom/NavLink';

import SearchField from '../search/SearchField';
import ContactListResolver from './ContactListResolver';

import './styles.css';

function ContactListBox() {
  return (
    <div className="contact-list">
      <SearchField />
      <div className="contact-list__content">
        <ContactListResolver />
        <NavLink to="/new">
          <button className="contact-list__add-button" type="button">
            +
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default ContactListBox;
