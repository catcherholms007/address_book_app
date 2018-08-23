import React, { Component } from 'react';
import {connect} from "react-redux";

import './App.css';
import ContactActions from './actions/contactActions';
import ContactList from "./components/contacts/ContactList";
import {Route, withRouter} from "react-router-dom";
import ContactForm from "./components/contacts/ContactForm";


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
            component={ContactForm}
            path={`/:contactId/`}
          />
      </div>
    );
  }
}

export default withRouter(connect()(App));
