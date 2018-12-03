import React, { PureComponent, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import ContactStore from '../../../stores/contactStore';

function ClearSearchButton({ contactStore }) {
  return contactStore.filterQuery !== '' ? (
    <ClearSearchButtonViewer onClick={contactStore.clearSearch} />
  ) : (
    <Fragment />
  );
}

ClearSearchButton.propTypes = {
  contactStore: PropTypes.instanceOf(ContactStore).isRequired,
};

class ClearSearchButtonViewer extends PureComponent {
  render() {
    const { onClick } = this.props;
    return (
      <button className="search-container__close-button" onClick={onClick} type="button">
        {'X'}
      </button>
    );
  }
}

ClearSearchButtonViewer.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default inject('contactStore')(observer(ClearSearchButton));
