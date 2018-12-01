import React from 'react';
import HashRouter from 'react-router-dom/HashRouter';
import 'normalize.css';

import Header from '../components/header/Header';
import BodyContent from './BodyContent';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <HashRouter>
        <BodyContent />
      </HashRouter>
    </div>
  );
}

export default App;
