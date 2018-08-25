import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

import ContactActions from "../../../../actions/contactActions";

import './styles.css';

class ContactListItem extends Component{

  constructor(props) {
    super(props);

    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onDeleteClick() {
    this.props.dispatch(ContactActions.delete(this.props.id));
  }

  render() {
    return (
      <div className={'contact-list-item'}>
        <div className={'contact-list-item__info'}>
          <NavLink
            to={`/${this.props.id}`}
          >
            <div className={'contact-list-item__name'}>
              {this.props.name}
            </div>
          </NavLink>
          <div className={'contact-list-item__email'}>
            {this.props.email}
          </div>
        </div>
        <div className={'contact-list-item__actions'}>
          <button onClick={this.onDeleteClick}>{'X'}</button>
        </div>
      </div>
    )
  }
}

export default connect()(ContactListItem);