import React, { useContext } from 'react';
import { startCase, lowerCase } from 'lodash';
import { CalculatorContext } from '../context/CalculatorContext';
import { removeArrayObjectById } from '../utils/arrayFunctions';
import { displayCurrency } from '../utils/currencyFunctions';
import * as styles from './SelectedItems.module.css';

function SelectedItems() {
  const [calculator, setCalculator] = useContext(CalculatorContext);

  // duplicated in Item
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
    return calculator.selectedItems;
  };

  // duplicated in Item
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
    return calculator.items;
  };

  /**
   * @desc handles button click event for removing item
   * @param {object} item 
   */
  const handleUncheckSelected = (item) => {
    document.getElementById(item.id).checked = false;
    selectItemInContext(item, false);
    removeItemFromSelected(item);
  };

  return (
    <>
      {
        calculator.selectedItems.length > 0 && (
        <div id="selectedItems" className={styles.selected}>
          <h2 className={styles.selectedHeading}>
            Selected Items:
          </h2>
          <div className={styles.selectedList}>
            {
              calculator.selectedItems && calculator.selectedItems.map((item) => (
                <div className={styles.selectedItem}>
                  <div>
                    <div className={styles.itemName}>{`${startCase(lowerCase(item.value.type))}: ${item.value.name}`}</div>
                    <div className={styles.itemPriceRange}>{`Price Range: ${displayCurrency(item.value.lowPrice)} - ${displayCurrency(item.value.highPrice)}`}</div>
                    <div className={styles.itemId}>{`Item ID: ${item.id}`}</div>
                  </div>
                  <button type="button" onClick={() => handleUncheckSelected(item)} className={styles.removeButton}>X</button> 
                </div>
              ))
            }
          </div>
        </div>
        )
      }
    </>
  );
}

export default SelectedItems;
