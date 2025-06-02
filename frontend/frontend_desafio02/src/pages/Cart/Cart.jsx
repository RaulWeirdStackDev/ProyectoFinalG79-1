import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { UserContext } from '../../context/UserContext';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Cart.css';

const Cart = () => {
  const { cart, updateQuantity, total, removeFromCart, clearCart } = useContext(CartContext);
  const { token } = useContext(UserContext);

  const handleCheckout = async () => {
    if (!token) {
      Swal.fire('Error', 'Debes iniciar sesión para realizar la compra.', 'error');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/checkouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart }),
      });
      if (!response.ok) throw new Error('Error en el proceso de compra.');

      Swal.fire('Éxito', 'Compra realizada con éxito. 🎉', 'success');
      clearCart(); //Aquí uso la función que creé en context y limpio el carrito...
    } catch (error) {
      console.error('Error en el checkout:', error.message);
      Swal.fire('Error', 'Hubo un problema al procesar la compra.', 'error');
    }
  };

  const confirmRemove = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se eliminará el producto del carrito.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id); // Elimina el producto si se confirma solamente la compra.
        Swal.fire('Eliminado', 'El producto ha sido eliminado del carrito.', 'success');
      }
    });
  };

  return (
    <div className="container mt-3 mx-auto container-custom">
      <h2 className="text-center mb-4">Detalles del Pedido:</h2>
      <div className="row justify-content-center">
        {cart.map((item) => (
          <div key={item.id} className="col-12 mb-4">
            <div className="d-flex flex-column flex-md-row align-items-center border p-3 rounded shadow-sm justify-content-between">
              <img
                src={item.img}
                alt={item.name}
                className="img-fluid rounded mb-3 mb-md-0 item-img"
              />
              <div className="ms-md-2 me-0 me-md-auto item-info mb-3 mb-md-0">
                <h5 className="text-truncate item-name text-capitalize">{item.name}:</h5>
              </div>
              <div className="ms-3 d-flex d-flex-align">
                <span className="d-block d-block-price">
                  ${(item.price * item.count).toLocaleString()}
                </span>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  -
                </button>
                <span className="mx-2">{item.count}</span>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  +
                </button>
                <button
                  className="btn btn-warning btn-sm ms-2"
                  onClick={() => confirmRemove(item.id)} 
                >
                  🗑
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-1">
        <h3>Total: ${total.toLocaleString()}</h3>
        <button className="btn btn-success mt-2 mb-2" disabled={!token} onClick={handleCheckout}>
          {token ? 'Pagar' : 'Inicia sesión para pagar'}
        </button>
      </div>
    </div>
  );
};

export default Cart;
