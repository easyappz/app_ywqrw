import React, { useEffect, useState } from 'react';
import { getMe, getMyListings } from '../api/users';
import ListingCard from '../components/ListingCard';

const Profile = () => {
  const [me, setMe] = useState(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const user = await getMe();
        setMe(user);
        const my = await getMyListings();
        setItems(Array.isArray(my) ? my : []);
      } catch (err) {
        const msg = err?.response?.data?.error || 'Ошибка загрузки профиля';
        setError(msg);
      }
    };
    load();
  }, []);

  return (
    <div data-easytag="id1-src/pages/Profile.jsx" className="page">
      <div data-easytag="id2-src/pages/Profile.jsx" className="container">
        <h2 data-easytag="id3-src/pages/Profile.jsx" className="page__title">Личный кабинет</h2>
        {error && <div data-easytag="id4-src/pages/Profile.jsx" className="alert alert--error">{error}</div>}
        {me && (
          <div data-easytag="id5-src/pages/Profile.jsx" className="card card--profile">
            <div data-easytag="id6-src/pages/Profile.jsx" className="card__body">
              <h3 data-easytag="id7-src/pages/Profile.jsx" className="card__title">{me.name}</h3>
              <p data-easytag="id8-src/pages/Profile.jsx" className="muted">{me.email}</p>
              <p data-easytag="id9-src/pages/Profile.jsx" className="muted small">На сервисе с {me.createdAt ? new Date(me.createdAt).toLocaleDateString() : ''}</p>
            </div>
          </div>
        )}
        <h3 data-easytag="id10-src/pages/Profile.jsx" className="section__title">Мои объявления</h3>
        <div data-easytag="id11-src/pages/Profile.jsx" className="grid">
          {items.length === 0 && (
            <p data-easytag="id12-src/pages/Profile.jsx" className="muted">У вас пока нет объявлений</p>
          )}
          {items.map((it) => (
            <div data-easytag="id13-src/pages/Profile.jsx" key={it.id} className="grid__item">
              <ListingCard item={it} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
