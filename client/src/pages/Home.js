import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CalculatorContext } from '../context/CalculatorContext';
import * as styles from './Home.module.css';

function Home() {
  const [calculator, setCalculator] = useContext(CalculatorContext);
  const [value, setValue] = useState(0);
  const history = useHistory();

  const handleChange = (event) => {
    setValue(event.currentTarget.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCalculator((prevCalculator) => (
      { ...prevCalculator, budget: value }
    ));
    history.push('/budget-calculator/app');
  };

  return (
    <div id="home" className={styles.home}>
      <h1 className={styles.heading} data-testid="budgetHeading">Budget Calculator</h1>
      <p className={styles.text} data-testid="budgetText">Enter your project budget to get started.</p>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input id="budgetInput" type="number" onChange={handleChange} className={styles.input} placeholder={calculator.budget} data-testid="budgetInput" />
          <input type="submit" value="Continue" className={styles.button} data-testid="budgetSubmitBtn" />
        </form>
      </div>
    </div>
  );
}

export default Home;
