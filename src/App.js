import React, { Component } from 'react';
import {connect} from "react-redux";
import {Route, withRouter} from "react-router-dom";

import './App.css';
import ContactActions from './actions/contactActions';
import ContactList from "./components/contacts/contact-list/ContactList";

import 'normalize.css';
import ContactFormLoader from "./components/contacts/contact-form/ContactFormLoader";

class App extends Component {

  componentDidMount() {
    this.props.dispatch(ContactActions.get());
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">My Address Book</h1>
        </header>
          <Route
            component={ContactList}
            path={`${this.props.match.url}/`}
          />
          <Route
            component={ContactFormLoader}
            path={`/:contactId/`}
          />
      </div>
    );
  }
}

export default withRouter(connect()(App));
