import { Link } from 'react-router-dom';
import './CardItem.css';
import { useContext } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';

const CardItem = ({ producto, addToCart, hideVerMas }) => {
  const { id_producto,
    nombre,
    precio_venta,
    estado,
    idioma,
    img,
    categoria,
    foil,
    stock
  } = producto;

  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const favorito = isFavorite(id_producto);

  const esSingle = categoria === 'single_mtg';
  const esFoil = esSingle && (foil === true || foil === 'true' || foil === 1);

  return (
    <div className="card card-item">
      <div className="card-img-wrapper">
        <img src={img} alt={nombre} className="card-img-top" />
      </div>
      <div className="card-body d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="card-title mb-2">{nombre}</h2>
        </div>
        <div className="info-line">
          <span>Idioma: {idioma}</span>
          <span>Estado: {estado}</span>
        </div>
        <span className='text-center'>Stock: {stock}</span>
        {esSingle && (
          <h6 className={`foil-text text-center ${esFoil ? 'foil-yes' : ''}`}>
            Foil: {esFoil ? 'Sí✨' : 'No⚫'}
          </h6>
        )}
        <h4 className="text-center">Precio: ${Number(precio_venta).toLocaleString()}</h4>
      </div>
      <div className={`card-footer d-flex ${hideVerMas ? 'justify-content-center' : 'justify-content-between'}`}>
        {!hideVerMas && (
          <Link to={`/itemdetails/${id_producto}`} className="btn btn-outline-dark btn-ver-mas btn-click">
            Ver más 🔎
          </Link>
        )}
        <button
          className="btn btn-sm"
          onClick={() => toggleFavorite(producto)}
          title={favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {favorito ? "❤️" : "🖤"}
        </button>
        <button className="btn btn-drixel btn-añadir btn-click" onClick={addToCart}>
          Añadir 🛒
        </button>
      </div>
    </div>
  );
};

export default CardItem;
