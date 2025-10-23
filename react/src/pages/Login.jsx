import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { login } from '../api/auth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Введите email и пароль');
      return;
    }
    setLoading(true);
    try {
      await login({ email: form.email, password: form.password });
      const from = location.state?.from?.pathname || '/profile';
      navigate(from);
    } catch (err) {
      const msg = err?.response?.data?.error || 'Ошибка входа';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-easytag="id1-src/pages/Login.jsx" className="page">
      <div data-easytag="id2-src/pages/Login.jsx" className="container form__wrap">
        <h2 data-easytag="id3-src/pages/Login.jsx" className="page__title">Вход</h2>
        <form data-easytag="id4-src/pages/Login.jsx" className="form" onSubmit={onSubmit}>
          {error && <div data-easytag="id5-src/pages/Login.jsx" className="alert alert--error">{error}</div>}
          <label data-easytag="id6-src/pages/Login.jsx" className="form__label">
            Email
            <input
              data-easytag="id7-src/pages/Login.jsx"
              className="input"
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
              required
            />
          </label>
          <label data-easytag="id8-src/pages/Login.jsx" className="form__label">
            Пароль
            <input
              data-easytag="id9-src/pages/Login.jsx"
              className="input"
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </label>
          <button data-easytag="id10-src/pages/Login.jsx" className="btn btn--primary" type="submit" disabled={loading}>
            {loading ? 'Входим...' : 'Войти'}
          </button>
          <p data-easytag="id11-src/pages/Login.jsx" className="muted small">
            Нет аккаунта? <Link data-easytag="id12-src/pages/Login.jsx" to="/register">Зарегистрироваться</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
