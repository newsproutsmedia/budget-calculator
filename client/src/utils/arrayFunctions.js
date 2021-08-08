/**
 * @desc remove item from array where item has an id parameter
 * @param {array} array 
 * @param {object} item 
 * @returns {array}
 */
export const removeArrayObjectById = (array, item) => {
  
  // get index of matching item by id
  const newArray = array.filter((element) => element.id !== item.id);
  
  // if no item found, return original array
  return newArray;
};
