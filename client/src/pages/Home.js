import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CalculatorContext } from '../context/CalculatorContext';
import { fade } from '../utils/transitionFunctions';
import * as styles from './Home.module.css';

function Home() {
  const [calculator, setCalculator] = useContext(CalculatorContext);
  const [budget, setBudget] = useState(0);
  const history = useHistory();

  const handleBudgetChange = (event) => {
    // get rid of decimals
    const wholeNumber = Math.round(event.currentTarget.value);
    setBudget(wholeNumber);
  };

  const navigateToCalculatorPage = () => {
    history.push('/budget-calculator/app');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // make sure formatting matches the values being used in Firebase
    // ideally, the multiplier should be set in a config file
    // to accomodate different value formatting
    const formattedValue = budget * 100;
    setCalculator((prevCalculator) => (
      { ...prevCalculator, budget: formattedValue }
    ));

    // call util function to fade out element
    // and then set timeout before navigation to calculator page
    fade.out('home').timer(300, navigateToCalculatorPage);
  };

  // after page loads, set state of budget var to value of context
  // this is so input placeholder maintains entered value
  // on focus and blur
  useEffect(() => {
    setBudget(calculator.budget / 100);
  }, []);

  return (
    <div id="home" className={styles.home}>
      <h1 className={styles.heading} data-testid="budgetHeading">Budget Calculator</h1>
      <p className={styles.text} data-testid="budgetText">Enter your project budget to get started.</p>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.input}>
            $
            <input
              id="budgetInput"
              type="number"
              placeholder={budget}
              onChange={handleBudgetChange}
              data-testid="budgetInput"
              className={styles.inputField}
              min={0}
              max={10000000}
              step={1}
            />
          </div>
          <input type="submit" value="Continue" className={styles.button} data-testid="budgetSubmitBtn" />
        </form>
      </div>
    </div>
  );
}

export default Home;
