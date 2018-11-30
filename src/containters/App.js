import React from 'react';
import {HashRouter as Router} from "react-router-dom";
import 'normalize.css';

import Header from "../components/header/Header";
import BodyContent from "./BodyContent";
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <BodyContent/>
      </Router>
    </div>
  );
}

export default App;
