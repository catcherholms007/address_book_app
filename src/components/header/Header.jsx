import React from 'react';

import HeaderTitle from './HeaderTitle';

function Header() {
  console.log('Header.render');
  return (
    <header className="App-header">
      <h1 className="App-title">My Address Book <HeaderTitle/></h1>
    </header>
  )
}

export default Header;
