import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { boundMethod } from 'autobind-decorator';

import Name from './name/Name';
import Email from './email/Email';
import ButtonSet from './button-set/ButtonSet';

import './styles.css';

class ContactForm extends Component {
  state = {
    message: null,
  };

  componentDidMount() {
    const { id, contactStore, isNew } = this.props;
    if (contactStore.contacts.some(element => element.id === id)) {
      const contact = contactStore.contacts.find(elem => elem.id === id);
      this.email.value = contact.email;
      this.name.value = contact.name;
    } else if (id === 'new') {
      this.email.value = '';
      this.name.value = '';
    }
    if (isNew) {
      this.props.pageStore.viewNewContactPage();
    } else {
      this.props.pageStore.viewEditContactPage();
    }
  }

  @boundMethod
  onSaveClick() {
    const { isNew, id } = this.props;
    if (this.isValid()) {
      this.setState({
        message: isNew ? 'Creating' : 'Updating',
      });
      this.props.contactStore[isNew ? 'create' : 'update'](
        id,
        this.getValues(),
      ).then(() => {
        this.navigateToMainPage();
      });
    }
  }

  @boundMethod
  onDeleteClick() {
    this.setState({
      message: 'Deleting',
    });
    this.props.contactStore.delete(this.props.id).then(() => {
      this.navigateToMainPage();
    });
  }

  getValues() {
    return {
      name: this.name.value,
      email: this.email.value,
    };
  }

  @boundMethod
  onCancelClick() {
    this.navigateToMainPage();
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
    return [
      {
        className: 'button-set__delete-button',
        name: 'delete',
        onClick: this.onDeleteClick,
        isVisible: !this.props.isNew,
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
    if (this.state.message) {
      return this.state.message;
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

export default inject('contactStore', 'pageStore')(observer(ContactForm));
