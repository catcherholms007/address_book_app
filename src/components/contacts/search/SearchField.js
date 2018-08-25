import React from 'react';
import {connect} from "react-redux";

import ContactActions from '../../../actions/contactActions';

import './styles.css';

class SearchField extends React.Component {

  constructor(props) {
    super(props);

    this.setRef = this.setRef.bind(this);
    this.onFilterQueryChange = this.onFilterQueryChange.bind(this);
  }

  componentDidMount() {
    this.search.value = this.props.contacts.filterQuery
  }

  onFilterQueryChange(event) {
    const value = event.target.value;
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.props.dispatch(ContactActions.search(value))
    }, 500);
  }

  setRef(input) {
    this.search = input;
  }

  render() {
    return (
      <div className={'search-container'}>
        <div className={'search-container-content'}>
          <input
            type={'text'}
            onChange={this.onFilterQueryChange}
            ref={this.setRef}
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts.toJS()
  };
};

export default connect(mapStateToProps)(SearchField);