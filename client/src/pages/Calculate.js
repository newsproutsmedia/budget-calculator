import React, { useEffect, useState, useContext } from 'react';
import { groupBy, startCase, lowerCase } from 'lodash';
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
- On page load, add items to context w/ isDisabled: false param
- 
*/

function Calculate() {
  const [calculator, setCalculator] = useContext(CalculatorContext);
  const [collectionItems] = useGetItemsByCollectionName('items');

  /**
   * @desc add isDisabled property to each array object
   * @param {array} items 
   * @returns {array} updated array
   */
  const addDisabledProperty = async (items) => {
    const newItems = items.map((item) => (
      {
        ...item,
        isDisabled: false,
      }
    ));
    console.log('addDisabledProperty: ', { items, newItems });
    return newItems;
  };

  /**
   * @desc group items by type using lodash _.groupBy
   * @param {array} items
   * @returns {object} grouped items
   */
  const groupItemsByType = async (items) => {
    const groupedItems = groupBy(items, (item) => item.value.type);
    console.log('groupItemsByType: ', { items, groupedItems });
    return groupedItems;
  };

  /**
   * @desc add grouped items object to context
   * @param {object} items
   * @returns {object} sorted items from context
   */
  const addItemsToContext = async (items) => {
    setCalculator((prevCalculator) => (
      { ...prevCalculator, items }
    ));
    console.log('addItemsToContext: ', { items, contextItems: calculator.items });
    return calculator.items;
  };
  
  /**
   * @desc load items from data store, process, and add to context
   * @returns {object} items from context
   */
  const loadItems = async () => {
    try {
      // add isDisabled property to each item
      const itemsWithDisabledProperty = await addDisabledProperty(collectionItems);
      // group items by type
      const groupedItems = await groupItemsByType(itemsWithDisabledProperty);
      // add items to context
      await addItemsToContext(groupedItems);
    } catch (error) {
      console.debug('ERROR! Calculate.loadItems failed', error);
    }
    return calculator.items;
  };

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

  useEffect(() => {
    loadItems();
    console.log('items', collectionItems);
    console.log('calculator', calculator);
  }, [collectionItems]);

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
            calculator.items && Object.keys(calculator.items).map((type) => {
              const typeItems = calculator.items[type];
              const title = startCase(lowerCase(type));
              console.log('Rendering Item: Index: ', typeItems);

              return (
                <h2>{title}</h2>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Calculate;
