import { useState, useEffect } from 'react';
import { getMenu } from '../services/api';
import MenuItem from '../components/MenuItem';

const CATEGORIES = ['all', 'Entrada', 'Platillo principal', 'Bebida', 'Postre'];
const CATEGORY_LABELS = { all: 'Todos', Entrada: 'Entradas', 'Platillo principal': 'Principales', Bebida: 'Bebidas', Postre: 'Postres' };

export default function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    loadMenu();
  }, []);

  async function loadMenu() {
    try {
      const data = await getMenu();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const filtered = activeCategory === 'all' ? items : items.filter((i) => i.categoria === activeCategory);

  return (
    <main className="container">
      <h1 className="page-title">Nuestro Menu</h1>
      <p className="subtitle">HU-02 — Ver el menu con precios para elegir antes de llegar</p>

      <div className="filters">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading">Cargando menu...</div>
      ) : (
        <div className="menu-grid">
          {filtered.length > 0 ? (
            filtered.map((item) => <MenuItem key={item._id} item={item} />)
          ) : (
            <div className="loading">No hay platillos en esta categoria</div>
          )}
        </div>
      )}
    </main>
  );
}
