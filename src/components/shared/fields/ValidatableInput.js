import React from 'react';

export default class ValidatableInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      error: false,
    };

    this.onChange = this.onChange.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  get value() {
    return this.state.value;
  }

  set value(value) {
    this.setState({
      value: value
    })
  }

  validate(value) {
    return true;
  }

  isValid() {
    const result = this.validate(this.state.value);
    this.setState({
      error: !result
    });
    return result;
  }

  onChange(event) {
    this.setState({
      value: event.target.value
    }, () => {
      this.isValid()
    });
  }
}