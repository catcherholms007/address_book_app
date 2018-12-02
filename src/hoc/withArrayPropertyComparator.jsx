import React, { Component } from 'react';

function shallowArrayEqual(prevProps, nextProps, propertyName) {
  const prevProperty = prevProps[propertyName];
  const nextProperty = nextProps[propertyName];
  const prevPropertyLength = prevProperty.length;
  const nextPropertyLength = nextProperty.length;
  console.log(prevPropertyLength, nextPropertyLength);
  console.log(prevProperty, nextProperty);
  if (prevPropertyLength !== nextPropertyLength) return false;
  for (let i = 0; i < prevPropertyLength; i++) {
    const prevElement = prevProperty[i];
    const nextElement = nextProperty[i];
    const prevElementKeys = Object.keys(prevElement);
    const prevElementKeysLength = prevElementKeys.length;
    for (let j = 0; j < prevElementKeysLength; j++) {
      const key = prevElementKeys[j];
      if (!hasOwnProperty.call(nextElement, key)) {
        return false;
      }
      if (prevElement[key] !== nextElement[key]) {
        return false;
      }
    }
  }
  return true;
}

export default function withArrayPropertyComparator(store, property, Clazz) {
  return class ArrayPropertyComparator extends Component {
    shouldComponentUpdate(nextProps) {
      return !shallowArrayEqual(this.props[store], nextProps[store], property);
      // return true;
    }

    render() {
      return <Clazz {...this.props} />;
    }
  };
}
