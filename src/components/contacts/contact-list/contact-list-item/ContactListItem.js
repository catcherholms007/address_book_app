import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {inject} from 'mobx-react';

import Icon from "../../../shared/icons/Icon";
import ContactActions from "../../../../actions/contactActions";

import './styles.css';

class ContactListItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      message: null
    };

    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onDeleteClick() {
    // TODO as one action via bus
    this.props.contactStore.delete(this.props.id)
      .then(() => {
        this.props.pageStore.closeContactForm();
      });
    this.setState({
      message: 'Deleting...'
    })
  }

  render() {
    return (
      <div className={'contact-list-item'}>
        <div className={'contact-list-item__info'}>
          <NavLink
            to={`/${this.props.id}`}
          >
            <div className={'contact-list-item__name'}>
              {this.props.name}
            </div>
          </NavLink>
          <div className={'contact-list-item__email'}>
            {this.props.email}
          </div>
        </div>
        <div className={'contact-list-item__right-part'}>
          <div className={'contact-list-item__message'}>
            <span>
            {this.state.message}
            </span>
          </div>
          <div className={'contact-list-item__actions'}>
            {this.state.message &&
              <div className={'contact-list-item__spinner'}>
                <Icon name={'spinner'}/>
              </div>
            }
            <button onClick={this.onDeleteClick}>{'X'}</button>
          </div>
        </div>
      </div>
    )
  }
}

export default inject('contactStore', 'pageStore')(ContactListItem);