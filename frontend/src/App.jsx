import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import UserOptions from './pages/UserOptions/UserOptions';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import Favoritos from './pages/Favoritos/Favoritos';
import Productos from './pages/Productos/Productos';
import Cart from './pages/Cart/Cart';
import ItemDetails from './pages/ItemDetails/ItemDetails';
import Profile from './pages/Profile/Profile';
import ProfileAdmin from './pages/ProfileAdmin/ProfileAdmin';
import NotFound from './pages/NotFound/NotFound';
import Footer from './pages/Footer/Footer';
import ProductosProvider from './context/ProductosContext';
import CartProvider from './context/CartContext';
import UserProvider, { UserContext } from './context/UserContext';
import FavoritesProvider from './context/FavoritesContext';

const App = () => {
  return (
    <UserProvider>
      <FavoritesProvider>
        <ProductosProvider>
          <CartProvider>
            <BrowserRouter>
              <div className="min-vh-100 d-flex flex-column">
                <Navbar />
                <main className="flex-grow-1 d-flex align-items-center justify-content-center">
                  <UserContext.Consumer>
                    {({ token, userData }) => (
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/itemdetails/:itemId" element={<ItemDetails />} />
                        <Route path="/productos/:categoria" element={<Productos />} />

                        <Route
                          path="/login"
                          element={
                            token ? (
                              userData?.rol?.id_rol === 1 ? (
                                <Navigate to="/profileadmin" replace />
                              ) : (
                                <Navigate to="/profile" replace />
                              )
                            ) : (
                              <LoginPage />
                            )
                          }
                        />
                        <Route
                          path="/profile"
                          element={
                            token && userData?.rol?.id_rol !== 1
                              ? <Profile />
                              : <Navigate to="/login" replace />
                          }
                        />
                        <Route
                          path="/profileadmin"
                          element={
                            token && userData?.rol?.id_rol === 1
                              ? <ProfileAdmin />
                              : <Navigate to="/login" replace />
                          }
                        />
                        <Route
                          path="/register"
                          element={token ? <Navigate to="/" replace /> : <RegisterPage />}
                        />
                        <Route
                          path="/useroptions"
                          element={token ? <Navigate to="/" replace /> : <UserOptions />}
                        />
                        <Route
                          path="/favoritos"
                          element={token ? <Favoritos /> : <Navigate to="/login" replace />}
                        />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    )}
                  </UserContext.Consumer>
                </main>
                <Footer />
              </div>
            </BrowserRouter>
          </CartProvider>
        </ProductosProvider>
      </FavoritesProvider>
    </UserProvider>
  );
};

export default App;
