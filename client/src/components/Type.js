import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { startCase, lowerCase } from 'lodash';
import ItemList from './ItemList';
import * as styles from './Type.module.css';

function Type({ type }) {

  const title = startCase(lowerCase(type));

  return (
    <div className={styles.type}>
      <h2 className={styles.typeHeading}>{title}</h2>
      <ItemList type={type} />
    </div>
  );

}

export default Type;

Type.propTypes = {
  type: PropTypes.string.isRequired,
};
