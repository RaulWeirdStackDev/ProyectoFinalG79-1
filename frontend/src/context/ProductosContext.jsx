import { createContext, useState, useEffect } from "react";

export const ProductosContext = createContext();

const ProductosProvider = ({ children }) => {
    const [allproductos, setProductos] = useState([]);

  useEffect(() => {
  fetch("http://localhost:3000/api/productos")
    .then(res => res.json())
    .then(data => {
      console.log("Productos recibidos:", data);  // Aquí compruebo lo que llega.
      setProductos(data);
    })
    .catch(error => console.error("Error al cargar productos:", error));
}, []);

    return (
        <ProductosContext.Provider value={{ allproductos }}>
            {children}
        </ProductosContext.Provider>
    );
};

export default ProductosProvider;
