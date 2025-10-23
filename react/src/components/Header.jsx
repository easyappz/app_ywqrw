import React, { useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthed = useMemo(() => {
    const token = localStorage.getItem('token');
    return Boolean(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header data-easytag="id1-src/components/Header.jsx" className="header">
      <div data-easytag="id2-src/components/Header.jsx" className="container header__wrap">
        <div data-easytag="id3-src/components/Header.jsx" className="header__left">
          <Link data-easytag="id4-src/components/Header.jsx" to="/" className="logo">
            Easyappz Маркет
          </Link>
          <nav data-easytag="id5-src/components/Header.jsx" className="nav">
            <Link data-easytag="id6-src/components/Header.jsx" to="/listings" className="nav__link">Объявления</Link>
            <Link data-easytag="id7-src/components/Header.jsx" to="/admin" className="nav__link">Админка</Link>
            {isAuthed && (
              <Link data-easytag="id8-src/components/Header.jsx" to="/create" className="nav__link nav__link--accent">Создать</Link>
            )}
          </nav>
        </div>
        <div data-easytag="id9-src/components/Header.jsx" className="header__right">
          <div data-easytag="id10-src/components/Header.jsx" className="header__search">
            <input
              data-easytag="id11-src/components/Header.jsx"
              className="search__input"
              type="text"
              placeholder="Поиск по объявлениям (скоро)"
              readOnly
            />
          </div>
          <div data-easytag="id12-src/components/Header.jsx" className="header__auth">
            {isAuthed ? (
              <>
                <Link data-easytag="id13-src/components/Header.jsx" to="/profile" className="btn btn--ghost">Профиль</Link>
                <button data-easytag="id14-src/components/Header.jsx" className="btn btn--danger" onClick={handleLogout}>Выйти</button>
              </>
            ) : (
              <Link data-easytag="id15-src/components/Header.jsx" to="/login" className="btn btn--primary">Войти</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
