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
    const labelId = `${value.id}-label`;
    document.getElementById(labelId).classList.toggle('checked');
    if (!event.currentTarget.checked) {
      removeItemFromSelected(value);
      return;
    }
    addItemToSelected(value);
  };

  // implement radio button & label
  // add Form element to Type component
  // make sure to add name property to input element with value of item.value.type
  // on rollover, highlight background color

  return (
    <div className={styles.item}>
      <input id={item.id} type="checkbox" value={item.id} onChange={(event) => handleCheckboxChange(event, item)} />
      <label id={`${item.id}-label`} htmlFor={item.id} className={styles.label}>
        <ul className={styles.itemDetails}>
          <li className={styles.itemName}>
            {item.value.name}
          </li>
          <li className={styles.itemIdTitle}>
            Price Range:
          </li>
          <li className={styles.itemPrice}>
            { `${displayCurrency(item.value.lowPrice)} - ${displayCurrency(item.value.highPrice)}` }
          </li>
          <li className={styles.itemIdTitle}>
            Item ID:
          </li>
          <li className={styles.itemId}>
            {item.id}
          </li>
        </ul>
      </label>
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
