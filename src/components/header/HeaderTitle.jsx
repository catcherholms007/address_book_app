import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import PageStore from '../../stores/pageStore';

function HeaderTitle({ pageStore }) {
  return <Fragment>{pageStore.status}</Fragment>;
}

HeaderTitle.propTypes = {
  pageStore: PropTypes.instanceOf(PageStore).isRequired,
};

export default inject('pageStore')(observer(HeaderTitle));
