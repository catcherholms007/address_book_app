import React, { Component } from 'react';
import NavLink from 'react-router-dom/NavLink';
import { inject } from 'mobx-react';
import { boundMethod } from 'autobind-decorator';

import Icon from '../../../shared/icons/Icon';

import './styles.css';

class ContactListItem extends Component {
  state = {
    message: null,
  };

  @boundMethod
  onDeleteClick() {
    // TODO as one action via bus
    const { contactStore, pageStore, id } = this.props;
    contactStore.delete(id).then(() => {
      pageStore.closeContactForm();
    });
    this.setState({
      message: 'Deleting...',
    });
  }

  render() {
    const { name, email, id } = this.props;
    const { message } = this.state;
    return (
      <div className="contact-list-item">
        <div className="contact-list-item__info">
          <NavLink to={`/${id}`}>
            <div className="contact-list-item__name">{name}</div>
          </NavLink>
          <div className="contact-list-item__email">{email}</div>
        </div>
        <div className="contact-list-item__right-part">
          <div className="contact-list-item__message">
            <span>{message}</span>
          </div>
          <div className="contact-list-item__actions">
            {message && (
              <div className="contact-list-item__spinner">
                <Icon name="spinner" />
              </div>
            )}
            <button onClick={this.onDeleteClick} type="button">
              X
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default inject('contactStore', 'pageStore')(ContactListItem);
