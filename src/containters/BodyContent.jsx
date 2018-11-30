import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";
import Router from "../components/Router";

class BodyContent extends Component{

  componentDidMount() {
    this.props.contactStore.fetchContacts();
  }

  render() {
    return (
      <Router loading={this.props.contactStore.loading}/>
    )
  }

}

export default withRouter(inject('contactStore', 'pageStore')(observer(BodyContent)));