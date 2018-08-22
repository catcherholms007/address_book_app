import {get} from "../utils/requests";

export default {
  get() {
    const path = 'contacts';
    return get(path);
  }
};