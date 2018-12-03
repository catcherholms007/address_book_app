/* eslint-disable no-bitwise */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { boundMethod } from 'autobind-decorator';
import PropTypes from 'prop-types';

import Name from './name/Name';
import Email from './email/Email';
import ButtonSet from './button-set/ButtonSet';

import './styles.css';
import ContactStore from '../../../stores/contactStore';

class ContactForm extends Component {
  state = {
    message: null,
  };

  componentDidMount() {
    const { id, contactStore } = this.props;
    if (contactStore.contacts.some(element => element.id === id)) {
      const contact = contactStore.contacts.find(elem => elem.id === id);
      this.email.value = contact.email;
      this.name.value = contact.name;
    } else if (id === 'new') {
      this.email.value = '';
      this.name.value = '';
    }
  }

  @boundMethod
  onSaveClick() {
    const { isNew, id, contactStore } = this.props;
    if (this.isValid()) {
      this.setState({
        message: isNew ? 'Creating' : 'Updating',
      });
      contactStore[isNew ? 'create' : 'update'](id, this.getValues()).then(() => {
        this.navigateToMainPage();
      });
    }
  }

  @boundMethod
  onDeleteClick() {
    const { contactStore, id } = this.props;
    this.setState({
      message: 'Deleting',
    });
    contactStore.delete(id).then(() => {
      this.navigateToMainPage();
    });
  }

  @boundMethod
  onCancelClick() {
    this.navigateToMainPage();
  }

  getValues() {
    return {
      name: this.name.value,
      email: this.email.value,
    };
  }

  @boundMethod
  setEmailRef(input) {
    this.email = input;
  }

  @boundMethod
  setNameRef(input) {
    this.name = input;
  }

  @boundMethod
  buttonsData() {
    const { isNew } = this.props;
    return [
      {
        className: 'button-set__delete-button',
        name: 'delete',
        onClick: this.onDeleteClick,
        isVisible: !isNew,
        label: 'Delete',
      },
      {
        className: 'button-set__save-button',
        name: 'save',
        onClick: this.onSaveClick,
        isVisible: true,
        label: 'Ok',
      },
      {
        className: 'button-set__cancel-button',
        name: 'cancel',
        onClick: this.onCancelClick,
        isVisible: true,
        label: 'Cancel',
      },
    ];
  }

  isValid() {
    return this.name.isValid() & this.email.isValid();
  }

  navigateToMainPage() {
    const { history, match } = this.props;
    history.replace(match.url.slice(0, match.url.lastIndexOf('/')));
  }

  render() {
    const { message } = this.state;
    if (message) {
      return message;
    }
    return (
      <div className="contact-form">
        <Name ref={this.setNameRef} />
        <Email ref={this.setEmailRef} />
        <ButtonSet buttons={this.buttonsData()} />
      </div>
    );
  }
}

ContactForm.propTypes = {
  contactStore: PropTypes.instanceOf(ContactStore).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  isNew: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default inject('contactStore')(observer(ContactForm));
