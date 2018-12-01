import React from 'react';

import ValidatableInput from '../../../shared/fields/ValidatableInput';

import './styles.css';

const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function isValid(email) {
  return emailRegExp.test(email) && email !== '';
}

export default class Email extends ValidatableInput {
  validate(value) {
    return isValid(value);
  }

  render() {
    const className = `contact-form__email ${
      this.state.error ? 'contact-form__email_error' : ''
    }`;
    return (
      <input
        className={className}
        name="email"
        value={this.state.value}
        type="email"
        onChange={this.onChange}
        required
        placeholder="Email"
      />
    );
  }
}
