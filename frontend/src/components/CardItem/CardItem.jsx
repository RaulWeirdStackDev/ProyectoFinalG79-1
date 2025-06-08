import { Link } from 'react-router-dom';
import './CardItem.css';
import { useContext } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';

const CardItem = ({ producto, addToCart, hideVerMas }) => {
  const { id_producto, nombre, precio_venta, estado, idioma, img } = producto;

  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const favorito = isFavorite(id_producto);

  return (
    <div className="card card-item">
      <img src={img} alt={nombre} className="card-img-top" />
      <div className="card-body d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="card-title mb-2">{nombre}</h2>
        </div>
        <h6>Idioma: {idioma}.<br />Estado: {estado}.</h6>
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
        <button className="btn btn-dark btn-añadir btn-click" onClick={addToCart}>
          Añadir 🛒
        </button>
      </div>
    </div>
  );
};

export default CardItem;
