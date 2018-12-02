import React from 'react';
import { boundMethod } from 'autobind-decorator';

export default class ValidatableInput extends React.Component {
  state = {
    value: '',
    error: false,
  };

  @boundMethod
  onChange(event) {
    this.setState(
      {
        value: event.target.value,
      },
      () => {
        this.isValid();
      },
    );
  }

  get value() {
    return this.state.value;
  }

  set value(value) {
    this.setState({
      value,
    });
  }

  @boundMethod
  isValid() {
    const { value } = this.state;
    const error = !this.props.validate(value);
    this.setState({
      error,
    });
    return !error;
  }
}
