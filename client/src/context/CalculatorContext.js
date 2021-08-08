import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const CalculatorContext = createContext();

function CalculatorProvider({ children }) {

  const [calculator, setCalculator] = useState(
    { 
      budget: 0, 
      selectedItems: [], 
      lowTotal: 0, 
      highTotal: 0,
    },
  );
  return (
    <CalculatorContext.Provider value={[calculator, setCalculator]}>
      {children}
    </CalculatorContext.Provider>
  );
}

export { CalculatorContext, CalculatorProvider };

CalculatorProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
