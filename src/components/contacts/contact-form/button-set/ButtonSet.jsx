import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

function ButtonSet({ buttons }) {
  return (
    <div className="contact-form__button-set">
      {buttons
        .filter(button => button.isVisible)
        .map(button => (
          <button
            className={button.className}
            key={`button_${button.name}`}
            type="button"
            name={button.name}
            onClick={button.onClick}
          >
            {button.label}
          </button>
        ))}
    </div>
  );
}

ButtonSet.propTypes = {
  buttons: PropTypes.shape().isRequired,
};

export default ButtonSet;
