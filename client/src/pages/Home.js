import React, { useState } from 'react';
import * as styles from './Home.module.css';

function Home() {
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    setValue(event.currentTarget.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // set context value to 
  };

  return (
    <div id="home" className={styles.home}>
      <h1 className={styles.heading} data-testid="budgetHeading">Budget Calculator</h1>
      <h2>{value}</h2>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input id="budgetInput" type="number" onChange={handleChange} className={styles.input} placeholder="Enter your budget" data-testid="budgetInput" />
          <input type="submit" value="Continue" className={styles.button} data-testid="budgetSubmitBtn" />
        </form>
      </div>
    </div>
  );
}

export default Home;
