import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StoreList = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get('/api/stores');
        setStores(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStores();
  }, []);

  return (
    <div>
      <h1>Stores</h1>
      <ul>
        {stores.map(store => (
          <li key={store._id}>
            {store.name} - {store.address} - Average Rating: {store.averageRating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreList;
