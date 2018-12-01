import React, {Component} from "react";

export default function withReloadLoading(store, property, Clazz) {
  return class ReLoader extends Component {
    render() {
      const changedProperty = this.props[store][property];
      return <Clazz {...this.props} changedProperty={changedProperty}/>
    }
  }
}