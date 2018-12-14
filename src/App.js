import React, { Component, lazy, Suspense } from 'react';
import logo from './logo.svg';
import './App.css';

const baseUrl = './components';
const OtherComponent = lazy(() => import(`${baseUrl}/OtherComponent`));

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
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
        <Suspense fallback={<div>Loading...</div>}><OtherComponent /></Suspense>
        
      </div>
    );
  }
}

export default App;
