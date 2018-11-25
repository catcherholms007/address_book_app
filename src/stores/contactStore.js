import {observable, action, ObservableMap, computed, values} from 'mobx';
import ContactsAPI from '../api/contacts-api'

class ContactStore {
  @observable contacts = [];
  @observable loading = true;
  @observable filterQuery = '';
  @observable filterResult = [];


  @action
  fetchContacts() {
    ContactsAPI.get().then(snapshot => {
      let data = snapshot.val();
      const keys = Object.keys(data);
      const keysCount = keys.length;
      for (let i = 0; i < keysCount; i++) {
        const id = keys[i];
        const value = data[id];
        this.contacts.push(Object.assign(value, {id}));
      }
      this.loading = false;
      console.log(this.loading);
      console.log(this.contacts);
    });
  }

  @action
  add(contact) {
    this.contacts.push(contact);
  }

  @action
  search(query) {
    if (query === '') {
      this.clearSearch();
    }
    else {
      this.filterQuery = query;
      const lowerCase = query.toLowerCase();
      this.filterResult = this.contacts.filter(element => element.name.toLowerCase().includes(lowerCase)
      && element.email.toLowerCase().includes(lowerCase));
    }
  }

  @action
  clearSearch() {
    this.filterQuery = '';
    this.filterResult = [];
  }

  @action
  delete(id) {
    return ContactsAPI.delete(id)
      .then(() => {
          const index = this.contacts.findIndex(element => element.id === id);
          this.contacts.splice(index, 1);
      });
  }
}

export default ContactStore;