import React, { useState } from 'react';

/**
 * @desc hook to force re-render
 * @returns setValue function
 */
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  const newValue = value + 1;
  return () => setValue(newValue); // update the state to force render
}

export default useForceUpdate;
