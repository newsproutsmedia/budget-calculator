import React, { useState, useContext } from 'react';
import { CalculatorContext } from '../context/CalculatorContext';
import useGetItemsByCollectionName from '../hooks/useGetItemsByCollectionName';
import { displayCurrency } from '../utils/currencyFunctions';
import { removeArrayObjectById } from '../utils/arrayFunctions';
import * as styles from './Calculate.module.css';
/*
- In this component, I'm retrieving the array of items from Firebase
and mapping to HTML elements
- In a future iteration of this component, the items will be organized
by type and mapped to components
*/

function Calculate() {
  const [calculator, setCalculator] = useContext(CalculatorContext);
  
  // retrieve the items array from Firebase
  const [items] = useGetItemsByCollectionName('items');

  const addItemToSelected = (item) => {
    console.log('Adding Item To Selected: ', item);
    setCalculator((prevCalculator) => {
      const prevItems = prevCalculator.selectedItems;
      return { ...prevCalculator, selectedItems: [...prevItems, item] };
    });
  };

  const removeItemFromSelected = (item) => {
    setCalculator((prevCalculator) => {
      const prevItems = prevCalculator.selectedItems;
      const newItems = removeArrayObjectById(prevItems, item);
      return { ...prevCalculator, selectedItems: [...newItems] };
    });
  };

  const handleCheckboxChange = (event, item) => {
    if (!event.currentTarget.checked) {
      removeItemFromSelected(item);
      return;
    }
    addItemToSelected(item);
  };

  const handleUncheckSelected = (item) => {
    document.getElementById(item.id).checked = false;
    removeItemFromSelected(item);
  };

  return (
    <div id="calculator" className={styles.calculator}>
      <div id="leftNav" className={styles.leftNav}>
        <div className={styles.selected}>
          <div className={styles.selectedList}>
            {
              calculator.selectedItems && calculator.selectedItems.map((item) => (
                <div className={styles.selectedItem}>
                  <div>
                    <div>{item.value.name}</div>
                    <div>{`${item.value.lowPrice} - ${item.value.highPrice}`}</div>
                  </div>
                  <button type="button" onClick={() => handleUncheckSelected(item)} className={styles.removeButton}>X</button> 
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div id="body" className={styles.body}>
        <h1 className={styles.heading}>Calculate Page</h1>
        <div className={styles.itemList}>
          {
            items && items.map((item) => (
              <div className={styles.item}>
                <span>
                  <input id={item.id} type="checkbox" value={item.id} onChange={(event) => handleCheckboxChange(event, item)} />
                  {item.value.name}
                </span>
                <ul>
                  <li>
                    ID:
                    {item.id}
                  </li>
                  <li>
                    Type:
                    {item.value.type}
                  </li>
                  <li>
                    Low Price:
                    {displayCurrency(item.value.lowPrice)}
                  </li>
                  <li>
                    High Price:
                    {displayCurrency(item.value.highPrice)}
                  </li>
                </ul>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Calculate;
