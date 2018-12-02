import React from 'react';

export default function withStorePropertyReloading(store, property, Clazz) {
  return function StorePropertyReload(props) {
    const {
      [store]: { [property]: changedProperty },
    } = props;
    return <Clazz {...props} changedProperty={changedProperty} />;
  };
}
