import { formatValue } from 'react-currency-input-field';

/**
 * @desc inserts decimal point into string
 * @param {string} value 
 */
export const addDecimalPoint = (value) => {
  // split string into array of characters
  const array = [...value];
  // insert decimal point
  array.splice(-2, 0, '.');
  // return reconstituted string
  return array.join('');
};

/**
 * @desc converts value to currency display
 * @param {number | string} value 
 * @returns 
 */
export const displayCurrency = (value) => {
  // ideally, this should make sure value only contains numbers
  // also, it'd be nice to pass in localization information
  // to allow international currency display
  let currencyString = value.toString();
  if (!currencyString.includes('.')) currencyString = addDecimalPoint(currencyString);
  const budget = {
    value: currencyString,
    groupSeparator: ',',
    decimalSeparator: '.',
    prefix: '$',
  };
  return formatValue(budget);
};

/**
 * @desc get total of all values in array
 * @param {object} items 
 * @oparam {string} propertyName
 * @returns {string} total
 */
export const totalAllItems = (items, propertyName) => {
  let total = 0;

  items.forEach((item) => {
    total += Number(item.value[propertyName]);
  });

  return total;
};
