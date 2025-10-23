import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div data-easytag="id1-src/pages/NotFound.jsx" className="page">
      <div data-easytag="id2-src/pages/NotFound.jsx" className="container">
        <h2 data-easytag="id3-src/pages/NotFound.jsx" className="page__title">Страница не найдена</h2>
        <p data-easytag="id4-src/pages/NotFound.jsx" className="muted">Похоже, вы перешли по неверной ссылке.</p>
        <Link data-easytag="id5-src/pages/NotFound.jsx" to="/" className="btn btn--primary">На главную</Link>
      </div>
    </div>
  );
};

export default NotFound;
