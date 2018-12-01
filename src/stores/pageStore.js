import { observable, action } from 'mobx';

class PageStore {
  @observable nextRoute = null;

  @observable status = '';

  @action
  closeContactForm() {
    this.nextRoute = '/';
  }

  @action
  viewMainPage() {
    this.status = '';
    this.nextRoute = null;
  }

  @action
  viewEditContactPage() {
    this.status = '/ Edit contact';
  }

  @action
  viewNewContactPage() {
    this.status = '/ New contact';
  }
}

export default PageStore;
