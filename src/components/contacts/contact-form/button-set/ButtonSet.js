import React from 'react';

import './styles.css';

function ButtonSet({buttons}) {
  return (
    <div className={'contact-form__button-set'}>
      {buttons.filter(button => button.isVisible).map(button => (
        <button
          className={button.className}
          key={'button_' + button.name}
          type={button.type}
          name={button.name}
          onClick={button.onClick}
        >
          {button.label}
        </button>
      ))}
    </div>
  )
}

export default ButtonSet;