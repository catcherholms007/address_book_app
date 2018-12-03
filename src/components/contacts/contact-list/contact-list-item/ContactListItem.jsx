import React, { PureComponent } from 'react';
import { boundMethod } from 'autobind-decorator';
import PropTypes from 'prop-types';

import NavLink from 'react-router-dom/NavLink';
import Icon from '../../../shared/icons/Icon';

import './styles.css';

class ContactListItem extends PureComponent {
  state = {
    message: null,
  };

  @boundMethod
  onDeleteClick() {
    const { id, onDeleteClick } = this.props;
    onDeleteClick(id);
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

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default ContactListItem;
