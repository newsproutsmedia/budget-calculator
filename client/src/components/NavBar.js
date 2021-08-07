import React, { useContext } from 'react';
import {
  Link,
} from 'react-router-dom';
import { CalculatorContext } from '../context/CalculatorContext';
import logo from '../images/yardzen-logo.png';
import * as styles from './NavBar.module.css';

function NavBar() {
  const [calculator, setCalculator] = useContext(CalculatorContext);

  return (
    <nav className={styles.header}>
      <div className={styles.brand}>
        <img src={logo} alt="Yardzen logo" title="Yardzen" className={styles.logo} height="40" />
      </div>
      <div>
        { calculator.budget }
      </div>
      <menu className={styles.menu}>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}><Link to="/budget-calculator">Home</Link></li>
          <li className={styles.menuItem}><Link to="/budget-calculator/app">Calculate</Link></li>
        </ul>
      </menu>
    </nav>
  );

}

export default NavBar;
