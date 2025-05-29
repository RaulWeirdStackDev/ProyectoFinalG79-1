import { createContext, useState, useEffect } from 'react';
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem('token');
    return savedToken ? JSON.parse(savedToken) : null;
  });

  const [userData, setUserData] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase(), password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Credenciales inválidas.');
      }

      setToken(data.token);
      localStorage.setItem('token', JSON.stringify(data.token));

      const profileRes = await fetch('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${data.token}` },
      });

      const user = await profileRes.json();

      if (!profileRes.ok) {
        throw new Error(user?.message || 'No se pudo cargar el perfil.');
      }

      setUserData(user);
      localStorage.setItem('user', JSON.stringify(user));

      console.log('Inicio de sesión exitoso.');
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
    }
  };

  const register = async (nombre, apellido, email, password) => {
    const capitalize = (str) =>
      str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

    try {
      const formattedNombre = capitalize(nombre);
      const formattedApellido = capitalize(apellido);
      const formattedEmail = email.toLowerCase();

      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formattedNombre,
          apellido: formattedApellido,
          email: formattedEmail,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || 'Error al registrar usuario.');
      }

      const data = await response.json();
      console.log('Registro exitoso:', data.message);
      return true;
    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUserData(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('Sesión cerrada.');
  };

  useEffect(() => {
    if (token && !userData) {
      const fetchUserProfile = async () => {
        try {
          const res = await fetch('http://localhost:5000/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) throw new Error('No se pudo obtener perfil');
          const user = await res.json();
          setUserData(user);
          localStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
          console.error('Error al obtener perfil:', error.message);
        }
      };
      fetchUserProfile();
    }
  }, [token, userData]);

  return (
    <UserContext.Provider value={{ token, login, register, logout, userData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
