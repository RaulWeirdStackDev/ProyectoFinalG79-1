import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { ProductosContext } from '../../context/ProductosContext'; 
import CardItem from '../../components/CardItem/CardItem';
import { CartContext } from '../../context/CartContext';

const ItemDetails = () => {
  const { addToCart } = useContext(CartContext);
  const { itemId } = useParams(); // Me trae el ID dinámico de la URL.
  const { allproductos } = useContext(ProductosContext); // Aquí saco los productos del context.

  console.log("ID desde la URL (pizzaId):", itemId);
  console.log("Productos disponibles:", allproductos);

  if (!allproductos || allproductos.length === 0) {
    return <div>Cargando productos...</div>;
  }

  const producto = allproductos.find(p => String(p.id) === String(itemId));
  
  if (!producto) {
    return <div>Producto no encontrado con ID: {itemId}</div>;
  }

  return (
    <div className="container mt-4 d-flex flex-column align-items-center justify-content-center">
      <h2>{producto.name}:</h2>
      <CardItem
        {...producto}
        addToCart={() => addToCart(producto)}
        hideVerMas={true}
      />
      <p
        className="text-white text-center p-3 rounded w-100"
        style={{ backgroundColor: "#294168" }}
      >
        {producto.desc}
      </p>
    </div>
  );
};

export default ItemDetails;
