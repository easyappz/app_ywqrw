import React, { useEffect, useState } from 'react';
import { getCategories } from '../api/categories';
import { createListing } from '../api/listings';
import { useNavigate } from 'react-router-dom';

const CreateListing = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', price: '', category: '', location: '' });
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const cats = await getCategories();
        setCategories(Array.isArray(cats) ? cats : []);
      } catch (err) {
        const msg = err?.response?.data?.error || 'Не удалось загрузить категории';
        setError(msg);
      }
    };
    load();
  }, []);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onFilesChange = (e) => {
    const list = Array.from(e.target.files || []).slice(0, 10);
    setFiles(list);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.title || !form.description || !form.category || String(form.price) === '') {
      setError('Заполните все обязательные поля');
      return;
    }
    const priceNum = Number(form.price);
    if (Number.isNaN(priceNum) || priceNum < 0) {
      setError('Цена должна быть числом больше или равным 0');
      return;
    }
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('description', form.description);
    fd.append('price', priceNum);
    fd.append('category', form.category);
    if (form.location) fd.append('location', form.location);
    files.forEach((f) => fd.append('images', f));

    setLoading(true);
    try {
      await createListing(fd);
      navigate('/listings');
    } catch (err) {
      const msg = err?.response?.data?.error || 'Не удалось создать объявление';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-easytag="id1-src/pages/CreateListing.jsx" className="page">
      <div data-easytag="id2-src/pages/CreateListing.jsx" className="container form__wrap">
        <h2 data-easytag="id3-src/pages/CreateListing.jsx" className="page__title">Создание объявления</h2>
        <form data-easytag="id4-src/pages/CreateListing.jsx" className="form" onSubmit={onSubmit}>
          {error && <div data-easytag="id5-src/pages/CreateListing.jsx" className="alert alert--error">{error}</div>}
          <label data-easytag="id6-src/pages/CreateListing.jsx" className="form__label">
            Заголовок
            <input
              data-easytag="id7-src/pages/CreateListing.jsx"
              className="input"
              type="text"
              name="title"
              value={form.title}
              onChange={onChange}
              placeholder="Например: Велосипед горный"
              required
            />
          </label>
          <label data-easytag="id8-src/pages/CreateListing.jsx" className="form__label">
            Описание
            <textarea
              data-easytag="id9-src/pages/CreateListing.jsx"
              className="textarea"
              name="description"
              value={form.description}
              onChange={onChange}
              placeholder="Подробно опишите состояние и особенности"
              required
              rows={5}
            />
          </label>
          <div data-easytag="id10-src/pages/CreateListing.jsx" className="form__row">
            <label data-easytag="id11-src/pages/CreateListing.jsx" className="form__label">
              Цена (₽)
              <input
                data-easytag="id12-src/pages/CreateListing.jsx"
                className="input"
                type="number"
                name="price"
                value={form.price}
                onChange={onChange}
                placeholder="0"
                min="0"
                required
              />
            </label>
            <label data-easytag="id13-src/pages/CreateListing.jsx" className="form__label">
              Категория
              <select
                data-easytag="id14-src/pages/CreateListing.jsx"
                className="select"
                name="category"
                value={form.category}
                onChange={onChange}
                required
              >
                <option data-easytag="id15-src/pages/CreateListing.jsx" value="">Выберите категорию</option>
                {categories.map((c) => (
                  <option data-easytag="id16-src/pages/CreateListing.jsx" key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
          </div>
          <label data-easytag="id17-src/pages/CreateListing.jsx" className="form__label">
            Местоположение (необязательно)
            <input
              data-easytag="id18-src/pages/CreateListing.jsx"
              className="input"
              type="text"
              name="location"
              value={form.location}
              onChange={onChange}
              placeholder="Город"
            />
          </label>
          <label data-easytag="id19-src/pages/CreateListing.jsx" className="form__label">
            Фотографии (до 10 файлов)
            <input
              data-easytag="id20-src/pages/CreateListing.jsx"
              className="input"
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={onFilesChange}
            />
          </label>
          <button data-easytag="id21-src/pages/CreateListing.jsx" className="btn btn--primary" type="submit" disabled={loading}>
            {loading ? 'Публикуем...' : 'Опубликовать'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
