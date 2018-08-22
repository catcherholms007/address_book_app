import React, { Component } from 'react';
import {connect} from "react-redux";

import ContactListItem from "./ContactListItem";
// TODO add styles

class ContactList extends Component{

  render() {
    return (
      <div className={'contact-list'}>
        {this.props.contacts.data.map((elem, index) => (
          <ContactListItem
            name={elem.name}
            key={'contact-list-item' + index}
            email={elem.email}
          />
        ))}
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