import React, { Fragment } from 'react';

export default function withLoading(Clazz) {
  return function Loader(ownProps) {
    const { loading, ...props } = ownProps;
    return loading ? <Fragment>Loading</Fragment> : <Clazz {...props} />;
  };
}
