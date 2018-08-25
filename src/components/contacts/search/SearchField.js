import React from 'react';
import {connect} from "react-redux";

import ContactActions from '../../../actions/contactActions';

import './styles.css';
import Icon from "../../shared/icons/Icon";

class SearchField extends React.Component {

  constructor(props) {
    super(props);

    this.setRef = this.setRef.bind(this);
    this.onFilterQueryChange = this.onFilterQueryChange.bind(this);
    this.onClearButtonClick = this.onClearButtonClick.bind(this);
  }

  componentDidMount() {
    this.search.value = this.props.contacts.filterQuery
  }

  componentWillReceiveProps(nextProps) {
    this.search.value = nextProps.contacts.filterQuery;
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

  onClearButtonClick() {
    this.props.dispatch(ContactActions.clearSearch())
  }

  render() {
    return (
      <div className={'search-container'}>
        <input
          type={'text'}
          onChange={this.onFilterQueryChange}
          ref={this.setRef}
        />
        <Icon name={'search'}/>
        {this.props.contacts.filterQuery !== '' &&
          <button
            className={'search-container__close-button'}
            onClick={this.onClearButtonClick}
          >
            {'X'}
          </button>
        }
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