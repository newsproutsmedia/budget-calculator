import React, { useEffect, useContext } from 'react';
import { CalculatorContext } from '../context/CalculatorContext';
import useForceUpdate from '../hooks/useForceUpdate';
import { displayCurrency, totalAllItems } from '../utils/currencyFunctions';
import * as styles from './Budget.module.css';

const budgetNotification = {
  under: 'You are under budget',
  inRange: 'Your budget is within the range of selected items',
  over: 'You are over budget',
};

function Budget() {
  const [calculator, setCalculator] = useContext(CalculatorContext);

  const forceUpdate = useForceUpdate();

  /**
   * @desc get price range totals of selected items
   * @returns {object} low and high totals
   */
  const getPriceRange = () => {
    let totals = {
      low: 0,
      high: 0,
    };

    if (calculator.selectedItems.length > 0) {
      totals = {
        low: totalAllItems(calculator.selectedItems, 'lowPrice'),
        high: totalAllItems(calculator.selectedItems, 'highPrice'),
      };
    }

    return totals;
  };

  /**
   * @desc add aggregate toal to context
   * @param {number} total 
   * @param {string} propertyName 
   * @returns total from context
   */
  const addTotalToContext = (total, propertyName) => {
    setCalculator((prevCalculator) => (
      {
        ...prevCalculator,
        [propertyName]: total,
      }
    ));
    return calculator[propertyName];
  };

  /**
   * @desc checks whether budget is over, under, or in range
   * @returns status from context
   */
  const checkBudgetStatus = () => {
    let budgetStatus;
    const budgetNum = Number(calculator.budget);
    if (budgetNum > Number(calculator.highTotal)) {
      budgetStatus = 'under';
    }
    if (budgetNum < Number(calculator.lowTotal)) {
      budgetStatus = 'over';
    }
    if (Number(calculator.lowTotal) < budgetNum && budgetNum < Number(calculator.highTotal)) {
      budgetStatus = 'inRange';
    }
    setCalculator((prevCalculator) => (
      {
        ...prevCalculator,
        status: budgetStatus,
      }
    ));
    return calculator.status;
  };

  // execute when refresh occurs from selectedItems
  // context update
  useEffect(() => {
    const totals = getPriceRange();
    addTotalToContext(totals.low, 'lowTotal');
    addTotalToContext(totals.high, 'highTotal');
  }, [calculator.selectedItems]);

  // execute when highTotal is updated in context
  // this is to fix one-click lag in status updating
  useEffect(() => {
    checkBudgetStatus();
    forceUpdate();
  }, [calculator.highTotal]);

  return (
    <div id="budget" className={styles.budget}>
      <h2 className={styles.budgetHeading}>
        Your Budget:
        <span className={styles.budgetAmount}>{ displayCurrency(calculator.budget) }</span>
      </h2>
      {
        calculator.selectedItems.length > 0 && (
        <div id="range">
          <div className={styles.rangeText}>
            Price Range Of Selected Items:
          </div>
          <div className={styles.rangeValues}>
            {`${displayCurrency(calculator.lowTotal)} - ${displayCurrency(calculator.highTotal)}`}
          </div>
          <div className={`${styles.notification} ${styles[calculator.status]}`}>
            { budgetNotification[calculator.status] }
          </div>
        </div>
        )
      }
      {
        calculator.selectedItems.length < 1 && (
          <div className={styles.rangeText}>
            Begin your project estimate by selecting items from the list.
          </div>
        )
      }
    </div>
  );
}

export default Budget;
