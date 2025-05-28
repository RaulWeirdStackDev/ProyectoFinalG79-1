import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import CardPizza from '../../components/CardPizza/CardPizza';
import { PizzaContext } from '../../context/PizzaContext';

const Home = () => {
    const { pizzas } = useContext(PizzaContext);
    const { addToCart } = useContext(CartContext);  // Traigo la función addToCart desde el CartContext

    return (
        <div className="container">
            <div className="row justify-content-center">
                {pizzas.length > 0 ? (
                    pizzas.map((pizza) => (
                        <div
                            key={pizza.id}
                            className="col-12 col-md-6 col-lg-4 d-flex justify-content-center mb-4"
                        >
                            <CardPizza 
                                {...pizza} 
                                addToCart={() => addToCart(pizza)}  // Pasar la función addToCart con los datos de la pizza que tengo.
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
