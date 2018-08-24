export default (dispatch, constant, promise, state) => {
  // dispatch({ type: constant, meta: { loading: true } });

  return promise
    .then((snapshot) => {
      console.log(snapshot);
      console.log(constant);
      if (snapshot) {
        dispatch({ type: constant, payload: snapshot.val() });
      }
      else {
        console.log(`${constant}_SUCCESS`);
        dispatch({ type: `${constant}_SUCCESS`, payload: state().contacts.toJS()});
      }
    })
    .catch((err) => {
      console.log(err);
      // TODO handling request errors
    });
};