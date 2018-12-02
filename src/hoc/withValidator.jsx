import React from 'react';

function injectReference(Clazz) {
  return React.forwardRef((props, ref) => <Clazz {...props} forwardedRef={ref} />);
}

function injectValidator(Clazz, validator) {
  return function Validator({ forwardedRef, ...rest }) {
    return <Clazz ref={forwardedRef} {...rest} validate={validator} />;
  };
}

export default function withValidator(validator, Clazz) {
  return injectReference(injectValidator(Clazz, validator));
}
