import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import CardPizza from '../../components/CardPizza/CardPizza';
import { PizzaContext } from '../../context/PizzaContext';
import { Slider } from '../../components/Slider/Slider';

const Home = () => {
  const { pizzas } = useContext(PizzaContext);
  const { addToCart } = useContext(CartContext);

  return (
    <div className="container">
      {/* Slider arriba del todo */}
      <Slider />

      {/* Grid de pizzas */}
      <div className="row justify-content-center mt-4">
        {pizzas.length > 0 ? (
          pizzas.map((pizza) => (
            <div
              key={pizza.id}
              className="col-12 col-md-6 col-lg-4 d-flex justify-content-center mb-4"
            >
              <CardPizza 
                {...pizza} 
                addToCart={() => addToCart(pizza)} 
              />
            </div>
          ))
        ) : (
          <p className="text-center mt-4">Cargando pizzas...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
