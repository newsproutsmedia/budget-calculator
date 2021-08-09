import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CalculatorContext } from '../context/CalculatorContext';
import { displayCurrency } from '../utils/currencyFunctions';
import { removeArrayObjectById } from '../utils/arrayFunctions';
import * as styles from './Item.module.css';

function Item({ item }) {
  const [calculator, setCalculator] = useContext(CalculatorContext);

  // duplicated in Calculate
  // make this into a custom hook
  /**
   * @desc updates value of isSelected property in context item
   * @param {object} value 
   * @param {boolean} isSelected 
   * @returns {object} updated items
   */
  const selectItemInContext = (value, isSelected) => {
    console.log('selectItem: ', value);
    const { type } = value.value;
    const prevItems = calculator.items;
    const prevType = prevItems[type];
    const index = prevType.findIndex((node) => node.id === value.id);
    prevType[index].isSelected = isSelected;
    setCalculator((prevCalculator) => (
      {
        ...prevCalculator,
        items: {
          ...prevItems,
          [type]: [
            ...prevType,
          ],
        },
      }
    ));
    console.log('selectItem: new Calc Items: ', calculator.items);
  };

  /**
   * @desc adds item to selectedItems in context
   * @param {object*} value item object
   */
  const addItemToSelected = (value) => {
    console.log('Adding Item To Selected: ', value);
    setCalculator((prevCalculator) => {
      const prevItems = prevCalculator.selectedItems;
      return { ...prevCalculator, selectedItems: [...prevItems, value] };
    });
  };

  // duplicated in Calculate
  // make this into a custom hook
  /**
   * @desc removes item from selectedItems property of context
   * @param {object*} value
   * @returns {object} updated selectedItems
   */
  const removeItemFromSelected = (value) => {
    setCalculator((prevCalculator) => {
      const prevItems = prevCalculator.selectedItems;
      const newItems = removeArrayObjectById(prevItems, value);
      return { ...prevCalculator, selectedItems: [...newItems] };
    });
  };

  /**
   * @desc remove all items of specific type from selectedItems in context
   * @param {string} type
   * @returns {array} updated selectedItems array from context
   */
  const clearAllOfTypeFromSelected = (type) => {
    type.forEach((node) => {
      document.getElementById(node.id).checked = false;
      selectItemInContext(node, false);
      removeItemFromSelected(node);
    });
    return calculator.selectedItems;
  };

  /**
   * @desc event handler for item onChange
   * @param {object} event 
   * @param {object} value item object
   * @returns {array} selectedItems from context
   */
  const handleCheckboxChange = (event, value) => {
    const labelId = `${value.id}-label`;
    document.getElementById(labelId).classList.toggle('checked');
    if (!event.currentTarget.checked) {
      selectItemInContext(value, false);
      removeItemFromSelected(value);
      return calculator.selectedItems;
    }
    clearAllOfTypeFromSelected(calculator.items[item.value.type]);
    document.getElementById(value.id).checked = true;
    selectItemInContext(value, true);
    addItemToSelected(value);
    return calculator.selectedItems;
  };

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
