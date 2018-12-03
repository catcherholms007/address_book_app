export default () => {
  function shallowArrayEqual(prevProps, nextProps) {
    const prevPropertyLength = prevProps.length;
    const nextPropertyLength = nextProps.length;
    if (prevPropertyLength !== nextPropertyLength) return false;
    for (let i = 0; i < prevPropertyLength; i++) {
      const prevElement = prevProps[i];
      const nextElement = nextProps[i];
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

  self.addEventListener('message', event => {
    const data = event.data.payload;
    const type = event.data.type;
    switch (type) {
      case 'FILTER': {
        const { query, contacts, filterResult } = data;
        const lowerCase = query.toLowerCase();
        const search = element => element.toLowerCase().includes(lowerCase);
        const searchResult = contacts.filter(
          element => search(element.name) || search(element.email),
        );
        let refresh = filterResult === null ? true : !shallowArrayEqual(filterResult, searchResult);
        postMessage({
          type: 'FILTER_RESULT',
          payload: {
            filterResult: searchResult,
            refresh,
          },
        });
        break;
      }
    }
  });
};
