/* eslint-disable react/no-unused-state */
import React from 'react';
import { boundMethod } from 'autobind-decorator';
import PropTypes from 'prop-types';

class ValidatableInput extends React.Component {
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
    const { value } = this.state;
    return value;
  }

  set value(value) {
    this.setState({
      value,
    });
  }

  @boundMethod
  isValid() {
    const { value } = this.state;
    const { validate } = this.props;
    const error = !validate(value);
    this.setState({
      error,
    });
    return !error;
  }
}

ValidatableInput.propTypes = {
  validate: PropTypes.func.isRequired,
};

export default ValidatableInput;
