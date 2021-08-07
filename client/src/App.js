import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Home from './pages/Home';
import logo from './images/yardzen-logo.png';
import Calculate from './pages/Calculate';
import './App.css';

function App() {
  return (
    <Router>
      <div id="app" className="app">
        <nav className="header">
          <brand className="brand">
            <img src={logo} alt="Yardzen logo" title="Yardzen" className="logo" height="40" />
          </brand>
          <menu className="menu">
            <ul className="menuList">
              <li className="menuItem"><Link to="/">Home</Link></li>
              <li className="menuItem"><Link to="/calculate">Calculate</Link></li>
            </ul>
          </menu>
        </nav>
        <main className="main">
          <Switch>
            <Route path="/calculate">
              <Calculate />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
