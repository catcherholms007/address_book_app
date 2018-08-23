import React, { Component } from 'react';
import {connect} from "react-redux";

import ContactListItem from "./ContactListItem";
import {NavLink} from "react-router-dom";
// TODO add styles

class ContactList extends Component{

  render() {
    if (this.props.contacts.loading) {
      return 'LOADING'
    }
    return (
      <div className={'contact-list'}>
        {Object.keys(this.props.contacts.data)
          .map(key => Object.assign({id: key}, this.props.contacts.data[key]))
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