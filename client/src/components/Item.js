import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { CalculatorContext } from '../context/CalculatorContext';
import { displayCurrency } from '../utils/currencyFunctions';
import { removeArrayObjectById } from '../utils/arrayFunctions';
import * as styles from './Item.module.css';

function Item({ item }) {
  const [calculator, setCalculator] = useContext(CalculatorContext);
  const [isChecked, setIsChecked] = useState(false);

  const addItemToSelected = (value) => {
    console.log('Adding Item To Selected: ', value);
    setCalculator((prevCalculator) => {
      const prevItems = prevCalculator.selectedItems;
      return { ...prevCalculator, selectedItems: [...prevItems, value] };
    });
  };

  const removeItemFromSelected = (value) => {
    setCalculator((prevCalculator) => {
      const prevItems = prevCalculator.selectedItems;
      const newItems = removeArrayObjectById(prevItems, value);
      return { ...prevCalculator, selectedItems: [...newItems] };
    });
  };

  const handleCheckboxChange = (event, value) => {
    if (!event.currentTarget.checked) {
      removeItemFromSelected(value);
      return;
    }
    addItemToSelected(value);
  };

  return (
    <div className={styles.item}>
      <input id={item.id} type="checkbox" value={item.id} onChange={(event) => handleCheckboxChange(event, item)} />
      <div className={styles.itemName}>
        {item.value.name}
      </div>
      <div className={styles.itemDetails}>
        <div className={styles.itemIdTitle}>
          Price Range:
        </div>
        <div className={styles.itemPrice}>
          { `${displayCurrency(item.value.lowPrice)} - ${displayCurrency(item.value.highPrice)}` }
        </div>
        <div className={styles.itemIdTitle}>
          Item ID:
        </div>
        <div className={styles.itemId}>
          {item.id}
        </div>
      </div>
    </div>
  );

}

export default Item;

Item.propTypes = {
  item: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
