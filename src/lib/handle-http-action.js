export default (dispatch, constant, promise) => {
  dispatch({ type: constant, meta: { loading: true } });

  return promise
    .then((snapshot) => {
      dispatch({ type: constant, payload: snapshot.val() });
    })
    .catch((err) => {
      // TODO handling request errors
    });
};