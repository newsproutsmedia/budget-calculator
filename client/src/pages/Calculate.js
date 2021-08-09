import React, { useEffect, useContext } from 'react';
import { groupBy, startCase, lowerCase } from 'lodash';
import { CalculatorContext } from '../context/CalculatorContext';
import { removeArrayObjectById } from '../utils/arrayFunctions';
import { displayCurrency, totalAllItems } from '../utils/currencyFunctions';
import useForceUpdate from '../hooks/useForceUpdate';
import useGetItemsByCollectionName from '../hooks/useGetItemsByCollectionName';
import Type from '../components/Type';
import * as styles from './Calculate.module.css';

const budgetNotification = {
  under: 'You are under budget',
  inRange: 'Your budget is within the range of selected items',
  over: 'You are over budget',
};

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

  useEffect(() => {
    loadItems();
  }, [collectionItems]);

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

  const addTotalToContext = (total, propertyName) => {
    setCalculator((prevCalculator) => (
      {
        ...prevCalculator,
        [propertyName]: total,
      }
    ));
    return calculator[propertyName];
  };

  const checkBudgetStatus = () => {
    console.log('Checking budget status');
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
  };

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const totals = getPriceRange();
    addTotalToContext(totals.low, 'lowTotal');
    addTotalToContext(totals.high, 'highTotal');
    console.log('Getting Totals', calculator);
  }, [calculator.selectedItems]);

  useEffect(() => {
    checkBudgetStatus();
    forceUpdate();
  }, [calculator.highTotal]);

  return (
    <div id="calculator" className={styles.calculator}>
      <div id="leftNav" className={styles.leftNav}>
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
        {
          calculator.selectedItems.length > 0 && (
          <div id="selectedItems" className={styles.selected}>
            <h2 className={styles.budgetHeading}>
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
