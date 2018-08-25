import React from 'react';

import ValidatableInput from "../../../shared/fields/ValidatableInput";

import './styles.css';

export default class Name extends ValidatableInput {

  validate(value) {
    return value !== '';
  }

  render() {
    const className = `contact-form__name ${(this.state.error) ? 'contact-form__name_error' : ''}`;
    return (
      <input
        className={className}
        name={'name'}
        value={this.state.value}
        type={'text'}
        required
        onChange={this.onChange}
        placeholder={'Name'}
      />
    )
  }
}