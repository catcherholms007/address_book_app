import React from 'react';

import './styles.css';
import SearchInput from "./SearchInput";
import SearchIcon from "./SearchIcon";
import ClearSearchButton from "./ClearSearchButton";

function SearchField() {
  return (
    <div className={'search-container'}>
      <SearchInput/>
      <SearchIcon/>
      <ClearSearchButton/>
    </div>
  );
}

export default SearchField;