import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { ProductosContext } from '../../context/ProductosContext';
import { useNavigate } from 'react-router-dom';

const EditProducto = () => {
  const { userData, token } = useContext(UserContext);
  const { allproductos, refreshProductos } = useContext(ProductosContext);
  const navigate = useNavigate();

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
useEffect(() => {
  if (!userData || userData.rol?.id_rol !== 1) {
    navigate('/');
  }
}, [userData, navigate]);


  const handleEditClick = (producto) => {
    setProductoSeleccionado(producto);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductoSeleccionado((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`https://proyectofinalg79-1.onrender.com/api/producto/${productoSeleccionado.id_producto}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productoSeleccionado),
      });

      if (!res.ok) throw new Error('Error al actualizar producto');

      alert('Producto actualizado correctamente');
      refreshProductos();
      setProductoSeleccionado(null);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmar = confirm('¿Eliminar producto?');
    if (!confirmar) return;

    try {
      const res = await fetch(`https://proyectofinalg79-1.onrender.com/api/productos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Error al eliminar');

      alert('Producto eliminado');
      refreshProductos();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Panel de Administración de Productos</h2>

      {productoSeleccionado ? (
        <div className="card p-4 mt-3">
          <h4>Editando: {productoSeleccionado.nombre}</h4>
          <input
            className="form-control mb-2"
            name="nombre"
            value={productoSeleccionado.nombre}
            onChange={handleChange}
            placeholder="Nombre"
          />
          <input
            className="form-control mb-2"
            name="descripcion"
            value={productoSeleccionado.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
          />
          <input
            className="form-control mb-2"
            name="precio"
            value={productoSeleccionado.precio}
            onChange={handleChange}
            placeholder="Precio"
          />
          <button className="btn btn-success me-2" onClick={handleUpdate}>Guardar cambios</button>
          <button className="btn btn-secondary" onClick={() => setProductoSeleccionado(null)}>Cancelar</button>
        </div>
      ) : (
        <div className="row mt-4">
          {allproductos.map((p) => (
            <div className="col-md-4 mb-3" key={p.id_producto}>
              <div className="card p-3">
                <h5>{p.nombre}</h5>
                <p>{p.descripcion}</p>
                <p>Precio: ${p.precio}</p>
                <button className="btn btn-primary me-2" onClick={() => handleEditClick(p)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleDelete(p.id_producto)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditProducto;
