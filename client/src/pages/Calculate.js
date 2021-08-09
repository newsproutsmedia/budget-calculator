import React, { useEffect, useContext } from 'react';
import { groupBy } from 'lodash';
import { CalculatorContext } from '../context/CalculatorContext';
import useGetItemsByCollectionName from '../hooks/useGetItemsByCollectionName';
import Type from '../components/Type';
import Budget from '../components/Budget';
import * as styles from './Calculate.module.css';
import SelectedItems from '../components/SelectedItems';

/**
 * @desc retrieve the array of items from Firebase and map to components
 */
function Calculate() {
  const [calculator, setCalculator] = useContext(CalculatorContext);
  const [collectionItems] = useGetItemsByCollectionName('items');

  /**
   * @desc add isSelected property to each array object
   * @param {array} items 
   * @returns {array} updated array
   */
  const addSelectedProperty = async (items) => {
    const newItems = items.map((item) => (
      {
        ...item,
        isSelected: false,
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
      const itemsWithDisabledProperty = await addSelectedProperty(collectionItems);
      // group items by type
      const groupedItems = await groupItemsByType(itemsWithDisabledProperty);
      // add items to context
      await addItemsToContext(groupedItems);
    } catch (error) {
      console.debug('ERROR! Calculate.loadItems failed', error);
    }
    return calculator.items;
  };

  useEffect(() => {
    loadItems();
  }, [collectionItems]);

  return (
    <div id="calculator" className={styles.calculator}>
      <div id="leftNav" className={styles.leftNav}>
        <Budget />
        <SelectedItems />
      </div>
      <div id="body" className={styles.body}>
        <div className={styles.typeList}>
          {
            calculator.items && Object.keys(calculator.items).sort().map((type) => (
              <Type type={type} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Calculate;
