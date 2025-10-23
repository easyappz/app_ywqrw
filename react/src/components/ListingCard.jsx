import React from 'react';
import { Link } from 'react-router-dom';

const ListingCard = ({ item }) => {
  const img = Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : '';
  return (
    <article data-easytag="id1-src/components/ListingCard.jsx" className="card">
      <Link data-easytag="id2-src/components/ListingCard.jsx" to={`/listing/${item.id}`} className="card__imageWrap">
        {img ? (
          <img data-easytag="id3-src/components/ListingCard.jsx" src={img} alt={item.title} className="card__image" />
        ) : (
          <div data-easytag="id4-src/components/ListingCard.jsx" className="card__image placeholder">Нет фото</div>
        )}
      </Link>
      <div data-easytag="id5-src/components/ListingCard.jsx" className="card__body">
        <h3 data-easytag="id6-src/components/ListingCard.jsx" className="card__title">
          <Link data-easytag="id7-src/components/ListingCard.jsx" to={`/listing/${item.id}`}>{item.title}</Link>
        </h3>
        <p data-easytag="id8-src/components/ListingCard.jsx" className="card__price">{item.price} ₽</p>
        <div data-easytag="id9-src/components/ListingCard.jsx" className="card__meta">
          <span data-easytag="id10-src/components/ListingCard.jsx" className="badge">{item.category || 'Без категории'}</span>
          {item.location && <span data-easytag="id11-src/components/ListingCard.jsx" className="muted">{item.location}</span>}
        </div>
        <div data-easytag="id12-src/components/ListingCard.jsx" className="card__footer">
          <span data-easytag="id13-src/components/ListingCard.jsx" className={`status ${item.isClosed ? 'status--closed' : 'status--open'}`}>{item.isClosed ? 'Закрыто' : 'Открыто'}</span>
          <span data-easytag="id14-src/components/ListingCard.jsx" className="muted small">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}</span>
        </div>
      </div>
    </article>
  );
};

export default ListingCard;
