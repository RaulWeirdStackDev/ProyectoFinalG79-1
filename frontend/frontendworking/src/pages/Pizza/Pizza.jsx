import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { PizzaContext } from '../../context/PizzaContext'; 
import CardPizza from '../../components/CardPizza/CardPizza';
import { CartContext } from '../../context/CartContext';

const Pizza = () => {
    const { addToCart } = useContext(CartContext);
    const { pizzaId } = useParams(); // Me trae el ID dinámico de la URL.
    const { pizzas } = useContext(PizzaContext); // Aquí saco todas las pizzas del context.

    const pizza = pizzas.find((p) => p.id === pizzaId); // Busco la pizza específica por su ID.

    if (!pizza) return <div>Cargando...</div>; 

    return (
        <div className="container mt-4 d-flex flex-column align-items-center justify-content-center">
            <h2>Pizza {pizza.name}:</h2>
            <p className="bg-dark text-white text-center p-3 rounded w-100">{pizza.desc}</p>
            <CardPizza {...pizza} 
             addToCart={() => addToCart(pizza)}
             hideVerMas={true} />
        </div>
    );
};

export default Pizza;
