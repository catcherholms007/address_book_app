import React from 'react';

import ValidateableInput from '../../../shared/fields/ValidateableInput';

import './styles.css';
import withValidator from '../../../../hoc/withValidator';

const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function validate(email) {
  return emailRegExp.test(email) && email !== '';
}

class Email extends ValidateableInput {
  render() {
    const className = `contact-form__email ${this.state.error ? 'contact-form__email_error' : ''}`;
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

export default withValidator(validate, Email);
