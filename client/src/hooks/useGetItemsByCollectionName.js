import { useState, useEffect } from 'react';
import firebase from 'firebase';

/*
- This is a custom React hook for accessing the items in a Firebase collection.
- Like all custom hooks, lowercase "use" is prepended to the function to indicate
it's intended purpose as a hook to React.
- I was initially going to call this hook "useGetItems", but decided it would be
more versatile if it were expanded to allow any collection to be retrieved by name.
*/

/**
 * @desc Returns array of items by collection name
 * @param {string} name 
 * @returns {array}
 */
const useGetItemsByCollectionName = (name) => {
  // use state to hold the items array
  const [items, setItems] = useState([]);

  // set up Firestore database connection
  const db = firebase.firestore();

  // useEffect is used here to initiate the hook funcitonality
  useEffect(() => {
    db.collection(name)
      .get()
      .then((querySnapshot) => {
        const arr = [];
        querySnapshot.docs.map((doc) => arr.push({ id: doc.id, value: doc.data() }));
        setItems(arr);
      });
  }, [db]);
  return [items];
};

export default useGetItemsByCollectionName;
