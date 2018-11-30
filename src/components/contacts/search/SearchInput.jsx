import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {boundMethod} from "autobind-decorator";
import debounce from 'lodash/debounce';

class SearchInput extends Component {

  componentDidMount() {
    this.searchElement.value = this.props.contactStore.filterQuery;
    this.search = debounce(this.props.contactStore.search, 700);
  }

  @boundMethod
  onFilterQueryChange(event) {
    this.search(event.target.value);
  }

  @boundMethod
  setRef(element) {
    this.searchElement = element
  }

  render() {
    return (
      <input
        type={'text'}
        onChange={this.onFilterQueryChange}
        ref={this.setRef}
      />
    );
  }

}

export default inject('contactStore')(observer(SearchInput));