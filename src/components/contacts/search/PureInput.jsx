import React, { PureComponent } from 'react';
import { boundMethod } from 'autobind-decorator';
import PropTypes from 'prop-types';

class PureInput extends PureComponent {
  getValue() {
    return this.searchElement;
  }

  @boundMethod
  setRef(element) {
    this.searchElement = element;
  }

  render() {
    const { onChange } = this.props;
    return <input type="text" onChange={onChange} ref={this.setRef} />;
  }
}

PureInput.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default PureInput;
