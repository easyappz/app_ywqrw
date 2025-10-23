import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getListing, closeListing } from '../api/listings';
import { getMe } from '../api/users';

const ListingDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [me, setMe] = useState(null);
  const [error, setError] = useState('');
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const item = await getListing(id);
        setData(item);
      } catch (err) {
        const msg = err?.response?.data?.error || 'Объявление не найдено';
        setError(msg);
      }
    };
    load();
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const loadMe = async () => {
      try {
        const user = await getMe();
        setMe(user);
      } catch (_) {
        // ignore
      }
    };
    loadMe();
  }, []);

  const canClose = data && !data.isClosed && me && data.owner && (data.owner === me.id);

  const onClose = async () => {
    if (!data) return;
    setClosing(true);
    setError('');
    try {
      const res = await closeListing(data.id);
      setData({ ...data, isClosed: res.isClosed });
    } catch (err) {
      const msg = err?.response?.data?.error || 'Не удалось закрыть объявление';
      setError(msg);
    } finally {
      setClosing(false);
    }
  };

  return (
    <div data-easytag="id1-src/pages/ListingDetails.jsx" className="page">
      <div data-easytag="id2-src/pages/ListingDetails.jsx" className="container">
        {error && <div data-easytag="id3-src/pages/ListingDetails.jsx" className="alert alert--error">{error}</div>}
        {!data ? (
          <div data-easytag="id4-src/pages/ListingDetails.jsx" className="alert">Загрузка...</div>
        ) : (
          <article data-easytag="id5-src/pages/ListingDetails.jsx" className="listing">
            <h2 data-easytag="id6-src/pages/ListingDetails.jsx" className="page__title">{data.title}</h2>
            <div data-easytag="id7-src/pages/ListingDetails.jsx" className="listing__wrap">
              <div data-easytag="id8-src/pages/ListingDetails.jsx" className="gallery">
                <div data-easytag="id9-src/pages/ListingDetails.jsx" className="gallery__main">
                  {Array.isArray(data.images) && data.images.length > 0 ? (
                    <img data-easytag="id10-src/pages/ListingDetails.jsx" src={data.images[0]} alt={data.title} className="gallery__image" />
                  ) : (
                    <div data-easytag="id11-src/pages/ListingDetails.jsx" className="gallery__placeholder">Нет фото</div>
                  )}
                </div>
                {Array.isArray(data.images) && data.images.length > 1 && (
                  <div data-easytag="id12-src/pages/ListingDetails.jsx" className="gallery__thumbs">
                    {data.images.map((src, idx) => (
                      <img data-easytag="id13-src/pages/ListingDetails.jsx" className="gallery__thumb" key={src + idx} src={src} alt={`image-${idx + 1}`} />
                    ))}
                  </div>
                )}
              </div>
              <div data-easytag="id14-src/pages/ListingDetails.jsx" className="listing__info">
                <p data-easytag="id15-src/pages/ListingDetails.jsx" className="price">{data.price} ₽</p>
                <p data-easytag="id16-src/pages/ListingDetails.jsx" className="muted">Категория: {data.category || '—'}</p>
                {data.location && <p data-easytag="id17-src/pages/ListingDetails.jsx" className="muted">Город: {data.location}</p>}
                <p data-easytag="id18-src/pages/ListingDetails.jsx" className="muted small">Опубликовано: {data.createdAt ? new Date(data.createdAt).toLocaleString() : ''}</p>
                <p data-easytag="id19-src/pages/ListingDetails.jsx" className={`status ${data.isClosed ? 'status--closed' : 'status--open'}`}>{data.isClosed ? 'Закрыто' : 'Открыто'}</p>
                {canClose && (
                  <button data-easytag="id20-src/pages/ListingDetails.jsx" className="btn btn--danger" onClick={onClose} disabled={closing}>
                    {closing ? 'Закрываем...' : 'Закрыть объявление'}
                  </button>
                )}
              </div>
            </div>
            <section data-easytag="id21-src/pages/ListingDetails.jsx" className="listing__desc">
              <h3 data-easytag="id22-src/pages/ListingDetails.jsx">Описание</h3>
              <p data-easytag="id23-src/pages/ListingDetails.jsx">{data.description}</p>
            </section>
          </article>
        )}
      </div>
    </div>
  );
};

export default ListingDetails;
