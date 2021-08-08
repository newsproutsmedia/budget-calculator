/**
 * @desc remove item from array where item has an id parameter
 * @param {array} array 
 * @param {object} item 
 * @returns {array}
 */
export const removeArrayObjectById = (array, item) => {
  
  // get index of matching item by id
  const index = array.indexOf((element) => element.id === item.id);
  
  // check that a matching item was found
  // return array with item removed
  if (index !== -1) return array.splice(index, 1);
  
  // if no item found, return original array
  return array;
};
