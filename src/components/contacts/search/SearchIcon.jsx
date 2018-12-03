import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import Icon from '../../shared/icons/Icon';
import ContactStore from '../../../stores/contactStore';

function SearchIcon({ contactStore }) {
  return <Icon name={contactStore.filtering ? 'spinner' : 'search'} />;
}

SearchIcon.propTypes = {
  contactStore: PropTypes.instanceOf(ContactStore).isRequired,
};

export default inject('contactStore')(observer(SearchIcon));
