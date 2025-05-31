import { createContext, useState, useEffect } from "react";

export const ProductosContext = createContext();

const ProductosProvider = ({ children }) => {
    const [allproductos, setProductos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/productos")
            .then((res) => res.json())
            .then((data) => setProductos(data));
    }, []);

    return (
        <ProductosContext.Provider value={{ allproductos }}>
            {children}
        </ProductosContext.Provider>
    );
};

export default ProductosProvider;
