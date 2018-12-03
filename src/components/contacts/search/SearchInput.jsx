import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { boundMethod } from 'autobind-decorator';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';

import withStorePropertyReloading from '../../../hoc/withStorePropertyReloading';
import ContactStore from '../../../stores/contactStore';
import PureInput from './PureInput';

class SearchInput extends Component {
  componentDidMount() {
    const { contactStore } = this.props;
    this.searchElement.getValue().value = contactStore.filterQuery;
    this.search = debounce(contactStore.search, 700);
  }

  componentDidUpdate() {
    const {
      contactStore: { filterQuery },
    } = this.props;
    const searchElementValue = this.searchElement.getValue().value;
    if (searchElementValue !== filterQuery) {
      this.searchElement.getValue().value = filterQuery;
    }
  }

  @boundMethod
  onFilterQueryChange(event) {
    this.search(event.target.value);
  }

  @boundMethod
  setRef(element) {
    this.searchElement = element;
  }

  render() {
    return <PureInput onChange={this.onFilterQueryChange} ref={this.setRef} />;
  }
}

SearchInput.propTypes = {
  contactStore: PropTypes.instanceOf(ContactStore).isRequired,
};

export default inject('contactStore')(
  observer(withStorePropertyReloading('contactStore', 'filterQuery', SearchInput)),
);
