import React, {Component} from 'react';

export function withLoading(Clazz) {
  return class Loader extends Component {
    render() {
      const { loading, ...props } = this.props;
      return loading
        ? 'Loading'
        : <Clazz {...props} />
    }
  }
}