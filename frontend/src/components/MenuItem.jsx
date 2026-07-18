export default function MenuItem({ item }) {
  return (
    <div className="menu-card">
      <div className="menu-card-img">
        <span>&#127860;</span>
      </div>
      <div className="menu-card-body">
        <span className="menu-category">{item.categoria}</span>
        <h3 className="menu-name">{item.nombre}</h3>
        <p className="menu-desc">{item.descripcion}</p>
        <div className="menu-footer">
          <span className="menu-price">${item.precio.toFixed(2)}</span>
          <span className="menu-time">{item.tiempo_preparacion_min} min</span>
        </div>
        {item.alergenos?.length > 0 && (
          <div className="menu-tags">
            {item.alergenos.map((a) => (
              <span key={a} className="tag tag-warn">{a}</span>
            ))}
          </div>
        )}
        {item.tags?.length > 0 && (
          <div className="menu-tags">
            {item.tags.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
