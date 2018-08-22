import React, { Component } from 'react';

class ContactListItem extends Component{
  render() {
    return (
      <div className={'contact-list-item'}>
        <div className={'contact-list-item__name'}>
          {this.props.name}
        </div>
        <div className={'contact-list-item__email'}>
          {this.props.email}
        </div>
      </div>
    )
  }
}

export default ContactListItem;