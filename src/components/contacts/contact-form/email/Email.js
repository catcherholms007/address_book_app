import React from 'react';
import './styles.css'

const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function isValid(email) {
  return emailRegExp.test(email)
}

export default class Email extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      error: false,
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
  }

  onChangeEmail(event) {
    const value = event.target.value;
    if(isValid(value)) {
      console.log('validation success');
      this.setState({
        value: value,
        error: false
      });
      this.props.onSuccessValidation(value);
    }
    else {
      console.log('validation error');
      this.setState({
        value: value,
        error: true
      });
      this.props.onErrorValidation()
    }
  }

  render() {
    console.log(this.state.error);
    const className = `contact-form__email ${(this.state.error) ? 'contact-form__email_error': ''}`;
    return (
      <div>
        <input
          className={className}
          name={'email'}
          value={this.state.value}
          type={'email'}
          pattern={emailRegExp}
          onChange={this.onChangeEmail}
          required
          placeholder={'Email'}
        />
      </div>
    )
  }

}