import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import Calculate from './pages/Calculate';
import './App.css';
import { CalculatorProvider } from './context/CalculatorContext';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <div id="app" className="app">
        <CalculatorProvider>
          <NavBar />
          <main className="main">
            <Switch>
              <Route path="/budget-calculator/app">
                <Calculate />
              </Route>
              <Route path="/budget-calculator">
                <Home />
              </Route>
            </Switch>
          </main>
        </CalculatorProvider>
      </div>
    </Router>
  );
}

export default App;
