import React, {Component} from 'react';
import uuid from 'uuid/v4';
import {inject, observer} from 'mobx-react';

import ContactForm from "./ContactForm";

import './styles.css';
import ContactActions from "../../../actions/contactActions";
import PageActions from "../../../actions/pageActions";

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
    console.log(props.contactStore.data);
    console.log(props.contactStore.contacts.some(element => element.id === id));
    if (props.contactStore.contacts.some(element => element.id === id)) {
      this.setState({
        id: id,
        isNew: false,
      });
    }
    else if (id === 'new') {
      this.setState({
        isNew: true,
        id: uuid(),
      })
    }
    this.setState({
      loading: false
    })
  }

  componentDidMount() {
    if (!this.props.contactStore.loading) {
      this.readProps(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pageStore.nextRoute !== '/') {
      this.readProps(nextProps);
    }
    else {
      const {history, match} = this.props;
      history.replace(match.url.slice(0, match.url.lastIndexOf('/')))
    }
  }

  componentWillUnmount() {
    this.props.pageStore.viewMainPage();
    // TODO
    // this.props.dispatch(ContactActions.research());
  }

  render() {
    if (this.state.loading) {
      return 'Loading from data base';
    }
    else {
      if (this.state.id) {
        return (
          <ContactForm
            {...this.props}
            id={this.state.id}
            isNew={this.state.isNew}
          />
        );
      }
      return 'Not Found';
    }
  }
}


export default inject('contactStore', 'pageStore')(observer(ContactFormLoader));