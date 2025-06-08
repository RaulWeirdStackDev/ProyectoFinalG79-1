import { createContext, useState } from "react";

export const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (producto) => {
    const token = localStorage.getItem("token");
    if (!token || !producto || !producto.id_producto) return;

    setFavorites((prev) => {
      const isFav = prev.some((p) => p.id_producto === producto.id_producto);
      if (isFav) {
        return prev.filter((p) => p.id_producto !== producto.id_producto);
      } else {
        return [...prev, producto];
      }
    });
  };

  const isFavorite = (idProducto) => {
    return favorites.some((p) => p.id_producto === idProducto);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
