import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CalculatorContext } from '../context/CalculatorContext';
import Item from './Item';
import * as styles from './ItemList.module.css';

function ItemList({ type }) {
  const [calculator, setCalculator] = useContext(CalculatorContext);

  const typeItems = calculator.items[type];

  return (
    <div className={styles.itemList}>
      {
        calculator.items && typeItems.map((item) => (
          <Item key={`${item.id}-key`} item={item} />
        ))
      }
    </div>
  );

}

export default ItemList;

ItemList.propTypes = {
  type: PropTypes.string.isRequired,
};
