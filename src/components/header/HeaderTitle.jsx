import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';

class HeaderTitle extends React.Component {
  render() {
    return <Fragment>{this.props.pageStore.status}</Fragment>;
  }
}

export default inject('pageStore')(observer(HeaderTitle));
