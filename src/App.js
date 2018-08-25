import React, { Component } from 'react';
import {connect} from "react-redux";
import {Route, withRouter} from "react-router-dom";

import ContactActions from './actions/contactActions';
import ContactList from "./components/contacts/contact-list/ContactList";
import ContactFormLoader from "./components/contacts/contact-form/ContactFormLoader";

import 'normalize.css';

import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(ContactActions.get());
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">My Address Book {this.props.page.status}</h1>
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

const mapStateToProps = (state) => {
  return {
    page: state.page.toJS()
  }
};

export default withRouter(connect(mapStateToProps)(App));
