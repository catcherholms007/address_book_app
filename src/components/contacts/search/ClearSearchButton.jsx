import React, { PureComponent, Fragment } from 'react';
import { inject, observer } from 'mobx-react';

function ClearSearchButton() {
  return this.props.contactStore.filterQuery !== '' ? (
    <ClearSearchButtonViewer onClick={this.props.contactStore.clearSearch} />
  ) : (
    <Fragment />
  );
}

class ClearSearchButtonViewer extends PureComponent {
  render() {
    return (
      <button
        className="search-container__close-button"
        onClick={this.props.onClick}
      >
        {'X'}
      </button>
    );
  }
}

export default inject('contactStore')(observer(ClearSearchButton));
