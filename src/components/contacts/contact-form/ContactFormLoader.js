import React, {Component} from 'react';
import {connect} from "react-redux";
import uuid from 'uuid/v4';

import './styles.css';
import ContactForm from "./ContactForm";

class ContactFormLoader extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isNew: true,
      id: null,
      loading: true,
    };
  }

  readProps(props) {
    const id = props.match.params.contactId;
    if (id in props.contacts.data) {
      this.setState({
        id: id,
        loading: false,
        isNew: false,
      });
    }
    else if (id === 'new') {
      this.setState({
        isNew: true,
        id: uuid(),
        loading: false,
      })
    }
    else
      this.setState({
        loading: false
      })
  }

  componentDidMount() {
    if (!this.props.contacts.loading) {
      this.readProps(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.page.nextRoute !== '/') {
      this.readProps(nextProps);
    }
    else {
      const {history, match} = this.props;
      history.replace(match.url.slice(0, match.url.lastIndexOf('/')))
    }
  }

  render() {
    return (
      <div className={'contact-form'}>
        {this.state.loading
          ? 'Loading'
          : this.state.id
            ? (
              <ContactForm
                {...this.props}
                id={this.state.id}
                isNew={this.state.isNew}
              />
            )
            : 'Not Found'
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts.toJS(),
    page: state.page.toJS()
  };
};

export default connect(mapStateToProps)(ContactFormLoader);