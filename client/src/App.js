import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Home from './pages/Home';
import Calculate from './pages/Calculate';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/calculate">Calculate</Link></li>
          </ul>
        </nav>
      </div>
      <Switch>
        <Route path="/calculate">
          <Calculate />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
