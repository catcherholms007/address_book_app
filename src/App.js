import React, { Component } from 'react';
import {connect} from "react-redux";

import './App.css';
import ContactActions from './actions/contactActions';
import ContactList from "./components/contacts/ContactList";


class App extends Component {

  componentDidMount() {
    this.props.dispatch(ContactActions.get());
    // TODO get from API
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">My Address Book</h1>
        </header>
        <ContactList />
      </div>
    );
  }
}

export default connect()(App);
