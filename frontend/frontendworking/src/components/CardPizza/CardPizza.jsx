import React from 'react';
import { Link } from 'react-router-dom'; 
import './CardPizza.css';

const CardPizza = ({ id, name, price, ingredients, img, addToCart, hideVerMas }) => (
  <div className="card card-pizza">
    <img src={img} alt={name} className="card-img-top" />
    <div className="card-body d-flex flex-column justify-content-between">
      <h2 className="card-title mb-2">Pizza {name}.</h2>
      <div>
        <p className="mb-1">🍕 Ingredientes:</p>
        <ul className="m-0 ingredients-list">
          {ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}.</li>
          ))}
        </ul>
      </div>
      <h4 className="text-center">
        Precio: ${price.toLocaleString()}
      </h4>
    </div>
    <div className={`card-footer d-flex ${
        hideVerMas ? 'justify-content-center' : 'justify-content-between'
      }`}>
      {!hideVerMas && ( // Condicional para mostrar el botón "Ver más", así se oculta en "Pizza.jsx"
        <Link to={`/pizza/${id}`} className="btn btn-outline-dark btn-ver-mas btn-click">
          Ver más 🔎
        </Link>
      )}
      <button 
        className="btn btn-dark btn-añadir btn-click" 
        onClick={addToCart} // Uso addToCart como onClick handler.
      >
        Añadir 🛒
      </button>
    </div>
  </div>
);

export default CardPizza;
