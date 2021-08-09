import React, { useContext } from 'react';
import { CalculatorContext } from '../context/CalculatorContext';
import Type from './Type';
import * as styles from './TypeList.module.css';

function TypeList() {
  const [calculator, setCalculator] = useContext(CalculatorContext);

  return (
    <div className={styles.typeList}>
      {
        calculator.items && Object.keys(calculator.items).sort().map((type) => (
          <Type key={`${type}-key`} type={type} />
        ))
      }
    </div>
  );

}

export default TypeList;
