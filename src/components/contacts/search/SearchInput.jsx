import React, { Component, PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { boundMethod } from 'autobind-decorator';
import debounce from 'lodash/debounce';

import withReloadLoading from '../../../hoc/withReloadLoading';

class SearchInput extends Component {
  componentDidMount() {
    this.searchElement.getValue().value = this.props.contactStore.filterQuery;
    this.search = debounce(this.props.contactStore.search, 700);
  }

  componentDidUpdate() {
    const query = this.props.contactStore.filterQuery;
    const searchElementValue = this.searchElement.getValue().value;
    if (searchElementValue !== query) {
      this.searchElement.getValue().value = query;
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

class PureInput extends PureComponent {
  getValue() {
    return this.searchElement;
  }

  @boundMethod
  setRef(element) {
    this.searchElement = element;
  }

  render() {
    return (
      <input type="text" onChange={this.props.onChange} ref={this.setRef} />
    );
  }
}

export default inject('contactStore')(
  observer(withReloadLoading('contactStore', 'filterQuery', SearchInput)),
);
