import React from 'react';
import logo from './logo.svg';
import './App.css';
import List from './List';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload. Just like this.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <h2>Just another div</h2>
        <List data={['one', 'two', 'three', 'four']} />
      </div>
    </div>
  );
}

export default App;
