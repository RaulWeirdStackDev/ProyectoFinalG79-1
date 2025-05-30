import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PizzaContext } from '../../context/PizzaContext';
import { CartContext } from '../../context/CartContext';  // Importo el contexto carrito
import CardPizza from "../../components/CardPizza/CardPizza";


const Productos = () => {
  const { categoria } = useParams();
  const { pizzas } = useContext(PizzaContext);
  const { addToCart } = useContext(CartContext); // Extrae la función addToCart del contexto carrito

  const productosFiltrados = pizzas.filter(p => 
    p.categoria && p.categoria.toLowerCase() === categoria.toLowerCase()
  );

  if (!productosFiltrados.length) 
    return <div>No hay productos en esta categoría: {categoria}</div>;

  return (
    <div>
      <h2>Productos en categoría: {categoria}</h2>
      <div className="productos-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {productosFiltrados.map(producto => (
          <CardPizza
            key={producto.id}
            id={producto.id}
            name={producto.name}
            price={producto.price}
            ingredients={producto.ingredients}
            img={producto.img}
            addToCart={() => addToCart(producto)} 
            hideVerMas={false}
          />
        ))}
      </div>
    </div>
  );
};

export default Productos;
