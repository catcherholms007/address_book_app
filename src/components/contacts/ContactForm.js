import React, { Component } from 'react';
import {connect} from "react-redux";
import uuid from 'uuid/v4';

const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

class ContactForm extends Component{

  constructor(props) {
    super(props);
    this.state = {
      isNew: true,
      id: null,
      name: null,
      email: null,
      loading: true
    };
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
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
    this.readProps(nextProps);
  }

  onChangeEmail(event) {
    const value = event.target.value;
    // TODO validation
    this.setState({
      email: value
    })
  }

  onChangeName(event) {
    const value = event.target.value;
    this.setState({
      name: value
    })
  }

  onSaveClick() {
    // TODO
  }

  onDeleteClick() {
    // TODO
  }

  onCancelClick() {
    const {history, match} = this.props;
    history.replace(match.url.slice(0, match.url.lastIndexOf('/')))
  }

  render() {
    if (this.state.loading) {
      return 'Loading';
    }
    else {
      if (this.state.id) {
        return (
          <div className={'contact-from'}>
            <input
              name={'name'}
              value={this.state.name}
              required
              onChange={this.onChangeName}
            />
            <input
              name={'email'}
              value={this.state.email}
              type={'email'}
              pattern={emailRegExp}
              onChange={this.onChangeEmail}
              required
            />
            {!this.state.isNew && <button
              name={'delete'}
              onClick={this.onDeleteClick}
            >
              {'Delete'}
            </button>}
            <button
              name={'cancel'}
              onClick={this.onCancelClick}
            >
              {'Cancel'}
            </button>
            <button
              name={'save'}
              type={'submit'}
              onClick={this.onSaveClick}
            >
              {'Ok'}
              </button>
          </div>
        )
      }
      return 'NOT FOUND';
    }

  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts.toJS()
  };
};

export default connect(mapStateToProps)(ContactForm);