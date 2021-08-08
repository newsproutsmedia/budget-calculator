import React from 'react';
import useGetItemsByCollectionName from '../hooks/useGetItemsByCollectionName';
import { displayCurrency } from '../utils/currencyFunctions';

/*
- In this component, I'm retrieving the array of items from Firebase
and mapping to HTML elements
- In a future iteration of this component, the items will be organized
by type and mapped to components
*/

function Calculate() {
  // retrieve the items array from Firebase
  const [items] = useGetItemsByCollectionName('items');
  return (
    <>
      <h1>Calculate Page</h1>
      <div>
        {
          items && items.map((item) => (
            <div className="item-container">
              <h3>{item.value.name}</h3>
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
