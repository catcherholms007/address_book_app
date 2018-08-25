import React, { Component } from 'react';
import {connect} from "react-redux";
import uuid from 'uuid/v4';

import ContactActions from "../../../actions/contactActions";
import Email from "./email/Email";

import './styles.css';
import ButtonSet from "./button-set/ButtonSet";

function getContactFromState(state) {
  return {
    name: state.name,
    email: state.email
  }
}

class ContactForm extends Component{

  constructor(props) {
    super(props);

    this.state = {
      isNew: true,
      id: null,
      name: null,
      email: null,
      loading: true,
      isValid: true
    };

    this.onCancelClick = this.onCancelClick.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onSuccessEmailValidation = this.onSuccessEmailValidation.bind(this);
    this.onErrorValidation = this.onErrorValidation.bind(this);
    this.buttonsData = this.buttonsData.bind(this);
  }

  readProps(props) {
    const id = props.match.params.contactId;
    if (id in props.contacts.data) {
      const contact = props.contacts.data[id];
      this.setState({
        id: id,
        name: contact.name,
        email: contact.email,
        loading: false,
        isNew: false,
      });
    }
    else if (id === 'new') {
      this.setState({
        isNew: true,
        id: uuid(),
        name: '',
        email: '',
        loading: false,
      })
    }
    else this.setState({
        loading: false
      })
  }

  componentDidMount() {
    if (!this.props.contacts.loading) {
      this.readProps(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.page.nextRoute === '/') {
      this.onCancelClick();
    }
    else {
      this.readProps(nextProps);
    }
  }

  onChangeName(event) {
    const value = event.target.value;
    this.setState({
      name: value
    })
  }

  onSaveClick() {
    if (this.state.isNew) {
      this.props.dispatch(ContactActions.create(this.state.id, getContactFromState(this.state)));
    }
    else {
      this.props.dispatch(ContactActions.update(this.state.id, getContactFromState(this.state)));
    }
  }

  onDeleteClick() {
    this.props.dispatch(ContactActions.delete(this.state.id));
  }

  onCancelClick() {
    const {history, match} = this.props;
    history.replace(match.url.slice(0, match.url.lastIndexOf('/')))
  }

  onSuccessEmailValidation(value) {
    this.setState({
      email: value,
      isValid: true
    })
  }

  onErrorValidation() {
    this.setState({
      isValid: false
    })
  }

  buttonsData() {
    return [
      {
        className: 'button-set__delete-button',
        name: 'delete',
        onClick: this.onDeleteClick,
        isVisible: !this.state.isNew,
        type: 'button',
        label: 'Delete'
      },
      {
        className: 'button-set__save-button',
        name: 'save',
        onClick: this.onCancelClick,
        isVisible: this.state.isValid,
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


  render() {
    if (this.state.loading) {
      return 'Loading';
    }
    else {
      if (this.state.id) {
        return (
          <div className={'contact-form'}>
            <input
              name={'name'}
              value={this.state.name}
              required
              onChange={this.onChangeName}
              placeholder={'Name'}
            />
            <Email
              value={this.state.email}
              onErrorValidation={this.onErrorValidation}
              onSuccessValidation={this.onSuccessEmailValidation}
            />
            <ButtonSet buttons={this.buttonsData()}/>
          </div>
        )
      }
      return 'NOT FOUND';
    }
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts.toJS(),
    page: state.page.toJS()
  };
};

export default connect(mapStateToProps)(ContactForm);