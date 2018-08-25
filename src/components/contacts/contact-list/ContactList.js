import React, { Component } from 'react';
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

import ContactListItem from "./contact-list-item/ContactListItem";
import SearchField from "../search/SearchField";

import './styles.css'

class ContactList extends Component{

  render() {
    const {contacts} = this.props;
    if (contacts.loading) {
      return 'LOADING'
    }
    return (
      <div className={'contact-list'}>
        <SearchField />
        <div className={'contact-list__content'}>
          {Object.keys(contacts.filterQuery !== ''
            ? contacts.filterResult
            : contacts.data)
            .map(key => Object.assign({id: key}, contacts.data[key]))
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

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts.toJS()
  };
};

export default connect(mapStateToProps)(ContactList);