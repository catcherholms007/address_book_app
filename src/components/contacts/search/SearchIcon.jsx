import React from 'react';
import { inject, observer } from 'mobx-react';
import Icon from '../../shared/icons/Icon';

function SearchIcon(props) {
  return <Icon name={props.contactStore.filtering ? 'spinner' : 'search'} />;
}

export default inject('contactStore')(observer(SearchIcon));
