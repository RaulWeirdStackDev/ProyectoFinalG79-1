import { createContext, useState, useEffect } from "react";

export const PizzaContext = createContext();

const PizzaProvider = ({ children }) => {
    const [allproductos, setPizzas] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/productos")
            .then((res) => res.json())
            .then((data) => setPizzas(data));
    }, []);

    return (
        <PizzaContext.Provider value={{ allproductos }}>
            {children}
        </PizzaContext.Provider>
    );
};

export default PizzaProvider;
