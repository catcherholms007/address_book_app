import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import Name from "./name/Name";
import Email from "./email/Email";
import ButtonSet from "./button-set/ButtonSet";
import ContactActions from "../../../actions/contactActions";

import './styles.css';

class ContactForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      message: null
    };

    this.onCancelClick = this.onCancelClick.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.buttonsData = this.buttonsData.bind(this);
    this.setEmailRef = this.setEmailRef.bind(this);
    this.setNameRef = this.setNameRef.bind(this);
  }

  getValues() {
    return {
      name: this.name.value,
      email: this.email.value
    }
  }

  componentDidMount() {
    const {id, contactStore, isNew} = this.props;
    if (contactStore.contacts.some(element => element.id === id)) {
      const contact = contactStore.contacts.find(elem => elem.id === id);
      this.email.value = contact.email;
      this.name.value = contact.name;
    }
    else if (id === 'new') {
      this.email.value = '';
      this.name.value = '';
    }
    if (isNew) {
      this.props.pageStore.viewNewContactPage();
    }
    else {
      this.props.pageStore.viewEditContactPage();
    }
  }

  setEmailRef(input) {
    this.email = input;
  }

  setNameRef(input) {
    this.name = input;
  }

  buttonsData() {
    return [
      {
        className: 'button-set__delete-button',
        name: 'delete',
        onClick: this.onDeleteClick,
        isVisible: !this.props.isNew,
        type: 'button',
        label: 'Delete'
      },
      {
        className: 'button-set__save-button',
        name: 'save',
        onClick: this.onSaveClick,
        isVisible: true,
        type: 'submit',
        label: 'Ok'
      },
      {
        className: 'button-set__cancel-button',
        name: 'cancel',
        onClick: this.onCancelClick,
        isVisible: true,
        type: 'button',
        label: 'Cancel'
      }
    ];
  }

  isValid() {
    return this.name.isValid() & this.email.isValid();
  }

  onSaveClick() {
    const {isNew, id} = this.props;
    if (this.isValid()) {
      this.props.dispatch(ContactActions[isNew ? 'create' : 'update'](id, this.getValues()));
      this.setState({
        message: isNew ? 'Creating' : 'Updating'
      });
    }
  }

  onDeleteClick() {
    this.props.dispatch(ContactActions.delete(this.props.id));
    this.setState({
      message: 'Deleting'
    });
  }

  onCancelClick() {
    const {history, match} = this.props;
    history.replace(match.url.slice(0, match.url.lastIndexOf('/')))
  }

  render() {
    if (this.state.message) {
      return this.state.message;
    }
    return (
      <div className={'contact-form'}>
        <Name ref={this.setNameRef}/>
        <Email ref={this.setEmailRef}/>
        <ButtonSet buttons={this.buttonsData()}/>
      </div>
    )
  }
}

export default inject('contactStore', 'pageStore')(observer(ContactForm));