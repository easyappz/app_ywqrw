import React, { useEffect, useState } from 'react';
import { getAdminStats } from '../api/stats';

const Admin = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getAdminStats();
        setStats(res);
      } catch (err) {
        const msg = err?.response?.data?.error || 'Не удалось загрузить статистику';
        setError(msg);
      }
    };
    load();
  }, []);

  return (
    <div data-easytag="id1-src/pages/Admin.jsx" className="page">
      <div data-easytag="id2-src/pages/Admin.jsx" className="container">
        <h2 data-easytag="id3-src/pages/Admin.jsx" className="page__title">Админ-панель</h2>
        {error && <div data-easytag="id4-src/pages/Admin.jsx" className="alert alert--error">{error}</div>}
        {!stats ? (
          <div data-easytag="id5-src/pages/Admin.jsx" className="alert">Загрузка...</div>
        ) : (
          <div data-easytag="id6-src/pages/Admin.jsx" className="grid grid--2">
            <div data-easytag="id7-src/pages/Admin.jsx" className="card">
              <div data-easytag="id8-src/pages/Admin.jsx" className="card__body">
                <h3 data-easytag="id9-src/pages/Admin.jsx" className="card__title">Общие показатели</h3>
                <ul data-easytag="id10-src/pages/Admin.jsx" className="list">
                  <li data-easytag="id11-src/pages/Admin.jsx">Пользователей: {stats.totalUsers}</li>
                  <li data-easytag="id12-src/pages/Admin.jsx">Объявлений всего: {stats.totalListings}</li>
                  <li data-easytag="id13-src/pages/Admin.jsx">Открытые: {stats.activeListings}</li>
                  <li data-easytag="id14-src/pages/Admin.jsx">Закрытые: {stats.closedListings}</li>
                </ul>
              </div>
            </div>
            <div data-easytag="id15-src/pages/Admin.jsx" className="card">
              <div data-easytag="id16-src/pages/Admin.jsx" className="card__body">
                <h3 data-easytag="id17-src/pages/Admin.jsx" className="card__title">За 24 часа</h3>
                <ul data-easytag="id18-src/pages/Admin.jsx" className="list">
                  <li data-easytag="id19-src/pages/Admin.jsx">Новых пользователей: {stats.newUsers24h}</li>
                  <li data-easytag="id20-src/pages/Admin.jsx">Новых объявлений: {stats.newListings24h}</li>
                </ul>
              </div>
            </div>
            <div data-easytag="id21-src/pages/Admin.jsx" className="card card--full">
              <div data-easytag="id22-src/pages/Admin.jsx" className="card__body">
                <h3 data-easytag="id23-src/pages/Admin.jsx" className="card__title">Распределение по категориям</h3>
                <ul data-easytag="id24-src/pages/Admin.jsx" className="list">
                  {Array.isArray(stats.listingsByCategory) && stats.listingsByCategory.map((row) => (
                    <li data-easytag="id25-src/pages/Admin.jsx" key={row.category} className="list__row">
                      <span data-easytag="id26-src/pages/Admin.jsx">{row.category}</span>
                      <span data-easytag="id27-src/pages/Admin.jsx" className="badge">{row.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
