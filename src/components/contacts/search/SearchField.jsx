import React from 'react';

import SearchInput from './SearchInput';
import SearchIcon from './SearchIcon';
import ClearSearchButton from './ClearSearchButton';

import './styles.css';

function SearchField() {
  return (
    <div className="search-container">
      <SearchInput />
      <SearchIcon />
      <ClearSearchButton />
    </div>
  );
}

export default SearchField;
