/**
 * @desc fade element transition
 */
export const fade = {

  /**
   * @desc fade in element by id, chain with timer to add callback timeout
   * @param {string} id 
   * @returns {object} this
   */
  in: function (id) {
    document.getElementById(id).style.opacity = 1;
    return this;
  },
  /**
   * @desc fade out element by id, chain with timer to add callback timeout
   * @param {string} id 
   * @returns {object} this
   */
  out: function (id) {
    document.getElementById(id).style.opacity = 0;
    return this;
  },
  /**
   * @desc call function after timeout
   * @param {int} length 
   * @param {function} callback
   */
  timer: function (length, callback) {
    setTimeout(() => {
      callback();
    }, length);
  },

};
