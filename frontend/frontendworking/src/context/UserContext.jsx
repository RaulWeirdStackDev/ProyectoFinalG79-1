import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        const savedToken = localStorage.getItem('token');
        return savedToken ? JSON.parse(savedToken) : null; // Recupera el token de localStorage, en caso de que exista.
    });

    // Método que uso para hacer login con el backend:
    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) throw new Error('Credenciales inválidas.');

            const data = await response.json();
            setToken(data.token); 
            localStorage.setItem('token', JSON.stringify(data.token)); 
            console.log('Inicio de sesión exitoso.');
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
        }
    };

    // Ahora el método para registrar con el backend:
    const register = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) throw new Error('Error al registrar usuario.');

            const data = await response.json();
            setToken(data.token); 
            localStorage.setItem('token', JSON.stringify(data.token)); 
            localStorage.setItem('email', JSON.stringify(email)); 
            console.log('Registro exitoso.');
        } catch (error) {
            console.error('Error al registrar usuario:', error.message);
        }
    };

    const logout = () => {
        setToken(null); 
        localStorage.removeItem('token'); // Elimina el token de localStorage, para que quede deslogueado.
        console.log('Sesión cerrada.');
    };

    // Guardo el token en localStorage cada vez que se actualiza...
    useEffect(() => {
        if (token !== null) {
            localStorage.setItem('token', JSON.stringify(token));
        }
    }, [token]);

    return (
        <UserContext.Provider value={{ token, login, register, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
