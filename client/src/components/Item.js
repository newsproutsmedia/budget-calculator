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
      <div className={styles.itemName}>
        <input id={item.id} type="checkbox" value={item.id} onChange={(event) => handleCheckboxChange(event, item)} />
        {item.value.name}
      </div>
      <div>
        <ul className={styles.itemDetails}>
          <li className={styles.itemPrice}>
            { `${displayCurrency(item.value.lowPrice)} - ${displayCurrency(item.value.highPrice)}` }
          </li>
          <li className={styles.itemId}>
            ID:
            {item.id}
          </li>
        </ul>
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
