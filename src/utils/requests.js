import firebase from 'firebase';

const config = {
  databaseURL: "https://address-book-app-8cc63.firebaseio.com",
};

firebase.initializeApp(config);

const database = firebase.database();

export const get = (path) => database.ref(path).once('value');
export const post = (path, data) => {};
export const put = () => {};
export const del = (path, data) => {};