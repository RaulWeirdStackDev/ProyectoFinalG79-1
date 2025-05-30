import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PizzaContext } from '../../context/PizzaContext';
import { CartContext } from '../../context/CartContext';
import CardPizza from "../../components/CardPizza/CardPizza";
import Iconos from "../../components/Iconos/Iconos";
import './Productos.css'; 

const Productos = () => {
  const { categoria } = useParams();
  const { allproductos } = useContext(PizzaContext);
  const { addToCart } = useContext(CartContext);

  const productosFiltrados = allproductos.filter(p => 
    p.categoria && p.categoria.toLowerCase() === categoria.toLowerCase()
  );

  return (
    <div>
      <div className="iconos-wrapper-productos">
        <Iconos />
      </div>

      <h2 className="text-center my-4">Productos en categoría: {categoria}</h2>

      {productosFiltrados.length ? (
        <div className="productos-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {productosFiltrados.map(producto => (
            <CardPizza
              key={producto.id}
              {...producto}
              addToCart={() => addToCart(producto)} 
              hideVerMas={false}
            />
          ))}
        </div>
      ) : (
        <p className="text-center">No hay productos en esta categoría: {categoria}</p>
      )}
    </div>
  );
};

export default Productos;
