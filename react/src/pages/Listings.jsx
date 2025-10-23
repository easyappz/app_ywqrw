import React, { useEffect, useState } from 'react';
import { getListings } from '../api/listings';
import ListingCard from '../components/ListingCard';

const Listings = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await getListings({ page: 1, limit: 20 });
        setItems(Array.isArray(res.items) ? res.items : []);
      } catch (err) {
        const msg = err?.response?.data?.error || 'Не удалось загрузить объявления';
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div data-easytag="id1-src/pages/Listings.jsx" className="page">
      <div data-easytag="id2-src/pages/Listings.jsx" className="container">
        <h2 data-easytag="id3-src/pages/Listings.jsx" className="page__title">Объявления</h2>
        {loading && <div data-easytag="id4-src/pages/Listings.jsx" className="alert">Загрузка...</div>}
        {error && <div data-easytag="id5-src/pages/Listings.jsx" className="alert alert--error">{error}</div>}
        <div data-easytag="id6-src/pages/Listings.jsx" className="grid">
          {!loading && items.length === 0 && (
            <p data-easytag="id7-src/pages/Listings.jsx" className="muted">Объявлений пока нет</p>
          )}
          {items.map((it) => (
            <div data-easytag="id8-src/pages/Listings.jsx" key={it.id} className="grid__item">
              <ListingCard item={it} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Listings;
