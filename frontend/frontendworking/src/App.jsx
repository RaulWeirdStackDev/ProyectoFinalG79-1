import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import Cart from './pages/Cart/Cart';
import Pizza from './pages/Pizza/Pizza';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';
import Footer from './pages/Footer/Footer';
import PizzaProvider from './context/PizzaContext';
import CartProvider from './context/CartContext';
import UserProvider, { UserContext } from './context/UserContext';

const App = () => {
  return (
    <UserProvider>
      <PizzaProvider>
        <CartProvider>
          <BrowserRouter>
            <div className="min-vh-100 d-flex flex-column">
              <Navbar />
              <main className="flex-grow-1 d-flex align-items-center justify-content-center">
                <UserContext.Consumer>
                  {({ token }) => (
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/pizza/:pizzaId" element={<Pizza />} />
                      <Route
                        path="/profile"
                        element={token ? <Profile /> : <Navigate to="/login" replace />}
                      />

                      <Route
                        path="/register"
                        element={token ? <Navigate to="/" replace /> : <RegisterPage />}
                      />

                      <Route
                        path="/login"
                        element={token ? <Navigate to="/" replace /> : <LoginPage />}
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
      </PizzaProvider>
    </UserProvider>
  );
};

export default App;
