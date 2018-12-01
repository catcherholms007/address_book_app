import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  databaseURL: 'https://address-book-app-8cc63.firebaseio.com',
};

firebase.initializeApp(config);

const database = firebase.database();

export const get = path => database.ref(path).once('value');
export const post = (path, id, data) => database.ref(`${path}/${id}`).set(data);
export const put = (path, id, data) =>
  database.ref().update({ [`${path}/${id}`]: data });
export const del = (path, id) => database.ref(`${path}/${id}`).remove();
