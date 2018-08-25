import React, { Component } from 'react';
import {connect} from "react-redux";

import ContactListItem from "./ContactListItem";
import {NavLink} from "react-router-dom";
import SearchField from "./search/SearchField";
// TODO add styles

class ContactList extends Component{

  render() {
    const {contacts} = this.props;
    if (contacts.loading) {
      return 'LOADING'
    }
    return (
      <div className={'contact-list'}>
        <SearchField />
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
            {'+'}
          </NavLink>
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