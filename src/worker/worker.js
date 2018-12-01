export default () => {
  self.addEventListener('message', event => {
    const data = event.data.payload;
    const type = event.data.type;
    switch (type) {
      case 'FILTER': {
        const { query, contacts } = data;
        const lowerCase = query.toLowerCase();
        const search = element => element.toLowerCase().includes(lowerCase);
        const filterResult = contacts.filter(
          element => search(element.name) || search(element.email),
        );
        postMessage({
          type: 'FILTER_RESULT',
          payload: {
            filterResult,
          },
        });
        break;
      }
    }
  });
};
