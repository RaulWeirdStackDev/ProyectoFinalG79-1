import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { ProductosContext } from '../../context/ProductosContext'; 
import CardItem from '../../components/CardItem/CardItem';
import { CartContext } from '../../context/CartContext';

const ItemDetails = () => {
  const { addToCart } = useContext(CartContext);
  const { itemId } = useParams();
  const { allproductos } = useContext(ProductosContext);

  if (!allproductos || allproductos.length === 0) {
    return <div>Cargando productos...</div>;
  }

  const producto = allproductos.find(p => String(p.id_producto) === String(itemId));

  if (!producto) {
    return <div>Producto no encontrado con ID: {itemId}</div>;
  }

  return (
    <div className="container mt-4 d-flex flex-column align-items-center justify-content-center">
      <h2>{producto.nombre}:</h2>
      <CardItem
        producto={producto}
        addToCart={() => addToCart(producto)}
        hideVerMas={true}
      />
      <p
        className="text-white text-center p-3 rounded w-100"
        style={{ backgroundColor: "#294168" }}
      >
        {producto.descripcion}
      </p>
    </div>
  );
};

export default ItemDetails;
