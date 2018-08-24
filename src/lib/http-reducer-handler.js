import Immutable from 'immutable';

export function clearErrors(map) {
  map.delete('error');
  map.delete('errorData');
}

export default (state, action) => {
  const meta = action.meta || {};

  return state.withMutations((map) => {
    clearErrors(map);
    map.set('loading', meta.loading === undefined ?  false: meta.loading);
    if (action.error) {
      try {
        map.set('errorData', Immutable.fromJS(action.payload.body));
      } catch (err) {
        map.set('errorData', null);
      }

      map.set('error', Immutable.fromJS(action.payload));
    } else if (!meta.loading) {
        if (action.payload !== undefined) {
          map.set('data', Immutable.fromJS(action.payload));
        }
    }
  });
};