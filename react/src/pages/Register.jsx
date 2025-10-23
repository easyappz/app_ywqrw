import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/auth';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', name: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.name || !form.password) {
      setError('Все поля обязательны для заполнения');
      return;
    }
    setLoading(true);
    try {
      await register({ email: form.email, name: form.name, password: form.password });
      navigate('/profile');
    } catch (err) {
      const msg = err?.response?.data?.error || 'Ошибка регистрации';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-easytag="id1-src/pages/Register.jsx" className="page">
      <div data-easytag="id2-src/pages/Register.jsx" className="container form__wrap">
        <h2 data-easytag="id3-src/pages/Register.jsx" className="page__title">Регистрация</h2>
        <form data-easytag="id4-src/pages/Register.jsx" className="form" onSubmit={onSubmit}>
          {error && <div data-easytag="id5-src/pages/Register.jsx" className="alert alert--error">{error}</div>}
          <label data-easytag="id6-src/pages/Register.jsx" className="form__label">
            Email
            <input
              data-easytag="id7-src/pages/Register.jsx"
              className="input"
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
              required
            />
          </label>
          <label data-easytag="id8-src/pages/Register.jsx" className="form__label">
            Имя
            <input
              data-easytag="id9-src/pages/Register.jsx"
              className="input"
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Иван"
              required
            />
          </label>
          <label data-easytag="id10-src/pages/Register.jsx" className="form__label">
            Пароль
            <input
              data-easytag="id11-src/pages/Register.jsx"
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
          <button data-easytag="id12-src/pages/Register.jsx" className="btn btn--primary" type="submit" disabled={loading}>
            {loading ? 'Создаём...' : 'Зарегистрироваться'}
          </button>
          <p data-easytag="id13-src/pages/Register.jsx" className="muted small">
            Уже есть аккаунт? <Link data-easytag="id14-src/pages/Register.jsx" to="/login">Войти</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
