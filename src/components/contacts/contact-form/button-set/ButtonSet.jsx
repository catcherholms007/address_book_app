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
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      className: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      label: PropTypes.string.isRequired,
      isVisible: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

export default ButtonSet;
