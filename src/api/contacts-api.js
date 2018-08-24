import {get, post, put, del} from "../utils/requests";

const path = 'contacts';

export default {
  get() {
    return get(path);
  },
  create(id, contact) {
    return post(path, id, contact);
  },
  update(id, contact) {
    return put(path, id, contact);
  },
  delete(id) {
    return del(path, id);
  }
};