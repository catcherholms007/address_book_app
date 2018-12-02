import React from 'react';

import ValidateableInput from '../../../shared/fields/ValidateableInput';
import withValidator from '../../../../hoc/withValidator';

import './styles.css';

function validate(value) {
  return value !== '';
}

class Name extends ValidateableInput {
  render() {
    const { value, error } = this.state;
    const className = `contact-form__name ${error ? 'contact-form__name_error' : ''}`;
    return (
      <input
        className={className}
        name="name"
        value={value}
        type="text"
        required
        onChange={this.onChange}
        placeholder="Name"
      />
    );
  }
}

export default withValidator(validate, Name);
