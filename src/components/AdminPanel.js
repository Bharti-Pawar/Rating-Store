import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [totalRatings, setTotalRatings] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/users');
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchStores = async () => {
      try {
        const res = await axios.get('/api/stores');
        setStores(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
    fetchStores();
  }, []);

  useEffect(() => {
    const ratings = stores.reduce((acc, store) => acc + store.ratings.length, 0);
    setTotalRatings(ratings);
  }, [stores]);

  return (
    <div>
      <h1>Admin Panel</h1>
      <div>
        <h2>Users</h2>
        <ul>
          {users.map(user => (
            <li key={user._id}>
              {user.name} - {user.email} - {user.role}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Stores</h2>
        <ul>
          {stores.map(store => (
            <li key={store._id}>
              {store.name} - {store.email} - {store.address} - Average Rating: {store.averageRating}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Total Ratings</h2>
        <p>{totalRatings}</p>
      </div>
    </div>
  );
};

export default AdminPanel;
