import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const authed = useMemo(() => Boolean(localStorage.getItem('token')), []);
  return (
    <div data-easytag="id1-src/pages/Home.jsx" className="page">
      <section data-easytag="id2-src/pages/Home.jsx" className="hero">
        <div data-easytag="id3-src/pages/Home.jsx" className="container hero__wrap">
          <h1 data-easytag="id4-src/pages/Home.jsx" className="hero__title">Добро пожаловать в Easyappz Маркет</h1>
          <p data-easytag="id5-src/pages/Home.jsx" className="hero__subtitle">Простой и удобный сервис для публикации и просмотра объявлений. Быстро находите нужные товары и услуги.</p>
          <div data-easytag="id6-src/pages/Home.jsx" className="hero__actions">
            <Link data-easytag="id7-src/pages/Home.jsx" to="/listings" className="btn btn--primary">Посмотреть объявления</Link>
            {authed && (
              <Link data-easytag="id8-src/pages/Home.jsx" to="/create" className="btn btn--accent">Создать объявление</Link>
            )}
          </div>
        </div>
      </section>
      <section data-easytag="id9-src/pages/Home.jsx" className="info">
        <div data-easytag="id10-src/pages/Home.jsx" className="container info__wrap">
          <div data-easytag="id11-src/pages/Home.jsx" className="info__block">
            <h2 data-easytag="id12-src/pages/Home.jsx">Публикуйте легко</h2>
            <p data-easytag="id13-src/pages/Home.jsx">Создайте объявление за минуту: добавьте фото, цену и описание.</p>
          </div>
          <div data-easytag="id14-src/pages/Home.jsx" className="info__block">
            <h2 data-easytag="id15-src/pages/Home.jsx">Покупайте выгодно</h2>
            <p data-easytag="id16-src/pages/Home.jsx">Смотрите свежие предложения пользователей по всей стране.</p>
          </div>
          <div data-easytag="id17-src/pages/Home.jsx" className="info__block">
            <h2 data-easytag="id18-src/pages/Home.jsx">Без лишнего</h2>
            <p data-easytag="id19-src/pages/Home.jsx">Ничего лишнего — только объявления и нужные действия.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
