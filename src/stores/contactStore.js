import { observable, action, toJS, computed } from 'mobx';

import worker from '../worker/worker';
import WebWorker from '../worker/workerSetup';
import ContactsAPI from '../api/contacts-api';

class ContactStore {
  @observable contacts = [];

  @observable loading = true;

  @observable filterQuery = '';

  @observable filterResult = null;

  @observable filtering = false;

  initWorker() {
    this.worker = new WebWorker(worker);
    this.worker.addEventListener('message', event => {
      const data = event.data.payload;
      const { type } = event.data;
      switch (type) {
        case 'FILTER_RESULT': {
          if (data.refresh) {
            this.filterResult = data.filterResult;
          }
          this.filtering = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  @action
  fetchContacts() {
    ContactsAPI.get().then(snapshot => {
      const data = snapshot.val();
      if (data) {
        const keys = Object.keys(data);
        const keysCount = keys.length;
        for (let i = 0; i < keysCount; i++) {
          const id = keys[i];
          const value = data[id];
          this.contacts.push(Object.assign(value, { id }));
        }
      }
      this.loading = false;
    });
  }

  @action
  add(contact) {
    this.contacts.push(contact);
  }

  @action.bound
  search(query) {
    this.filtering = true;
    if (query === '') {
      this.clearSearch();
    } else {
      this.filterQuery = query;
      this.worker.postMessage({
        type: 'FILTER',
        payload: {
          query,
          contacts: toJS(this.contacts),
          filterResult: toJS(this.filterResult),
        },
      });
    }
  }

  @action.bound
  research() {
    this.filtering = true;
    if (this.filterQuery === '') {
      this.clearSearch();
    } else {
      this.worker.postMessage({
        type: 'FILTER',
        payload: {
          query: this.filterQuery,
          contacts: toJS(this.contacts),
        },
      });
    }
  }

  @action.bound
  clearSearch() {
    this.filterQuery = '';
    this.filterResult = null;
    this.filtering = false;
  }

  @action
  create(id, contact) {
    return ContactsAPI.create(id, contact).then(() => {
      this.contacts.push(Object.assign(contact, { id }));
    });
  }

  @action
  update(id, contact) {
    return ContactsAPI.update(id, contact).then(() => {
      const contactLocal = this.contacts.findIndex(element => element.id === id);
      this.contacts[contactLocal] = Object.assign(contact, { id });
    });
  }

  @action
  delete(id) {
    return ContactsAPI.delete(id).then(() => {
      const index = this.contacts.findIndex(element => element.id === id);
      this.contacts.splice(index, 1);
    });
  }

  @computed
  get actualContacts() {
    return this.filterQuery !== ''
      ? this.filterResult
        ? this.filterResult
        : this.contacts
      : this.contacts;
  }
}

export default ContactStore;
