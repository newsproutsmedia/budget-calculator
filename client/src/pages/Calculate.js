import React, { useState, useContext } from 'react';
import { CalculatorContext } from '../context/CalculatorContext';
import useGetItemsByCollectionName from '../hooks/useGetItemsByCollectionName';
import { displayCurrency } from '../utils/currencyFunctions';
import { removeArrayObjectById } from '../utils/arrayFunctions';

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

  const handleCheckboxChange = (event) => {
    if (!event.currentTarget.checked) {
      removeItemFromSelected(event.currentTarget.value);
    }
    addItemToSelected(event.currentTarget.value);
  };

  return (
    <>
      <h1>Calculate Page</h1>
      <div>
        {
          items && items.map((item) => (
            <div className="item-container">
              <span>
                <input type="checkbox" value={item} onChange={handleCheckboxChange}/>
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
    </>
  );
}

export default Calculate;
