import React, { Component } from 'react';
import {NavLink} from "react-router-dom";

class ContactListItem extends Component{
  render() {
    return (
      <NavLink
        to={`/${this.props.id}`}
      >
        <div className={'contact-list-item'}>
          <div className={'contact-list-item__name'}>
            {this.props.name}
          </div>
          <div className={'contact-list-item__email'}>
            {this.props.email}
          </div>
        </div>
      </NavLink>
    )
  }
}

export default ContactListItem;