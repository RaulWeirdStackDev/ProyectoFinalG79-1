import { useState, useEffect, useContext } from 'react';
import { Container, Table, Accordion, Alert, Spinner } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';

export const Ordenes = () => {
  const { token } = useContext(UserContext);
  const [ordenes, setOrdenes] = useState([]);
  // const [detalles, setDetalles] = useState({});
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const getOrdenByUser = async () => {
    try {
      const user = localStorage.getItem("user");
      const { id } = JSON.parse(user);

      const res = await fetch(`https://proyectofinalg79-1.onrender.com/api/ventas/usuario/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json()

      setOrdenes(data.data)

      console.log(data.data)
      // await setFavorites(data.data)
      // const arrayFavoritos = await Promise.all(
      //   data.data.map((favorito) => fetchProductoById(favorito.id_producto))
      // );
      // await setFavoritesArray(arrayFavoritos)
    } catch (error) {
      console.error("Error al cargar los favoritos:", error)
    }
  }


  useEffect(() => {
    // const fetchOrdenes = async () => {
    //   if (!userData || !userData.id) {
    //     setError('Por favor, inicia sesión para ver tus órdenes.');
    //     setLoading(false);
    //     return;
    //   }
    //   try {
    //     setLoading(true);
    //     const response = await readVentaByUsuarioModel(userData.id, token);
    //     setOrdenes(response);
    //   } catch (err) {
    //     setError('Error al cargar las órdenes. Intenta de nuevo más tarde.');
    //     console.error(err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchOrdenes();
    getOrdenByUser()
  }, []);

  // const fetchDetalles = async (idVenta) => {
  //   if (detalles[idVenta]) return;
  //   try {
  //     const response = await readVentaByVentaModel(idVenta, token);
  //     setDetalles((prev) => ({ ...prev, [idVenta]: response }));
  //   } catch (err) {
  //     setError('Error al cargar los detalles de la orden.');
  //     console.error(err);
  //   }
  // };

  // if (!userData || !userData.id) {
  //   return (
  //     <Container className="my-5">
  //       <Alert variant="warning">Debes iniciar sesión para ver tus órdenes.</Alert>
  //     </Container>
  //   );
  // }

  // if (loading) {
  //   return (
  //     <Container className="text-center my-5">
  //       <Spinner animation="border" role="status">
  //         <span className="visually-hidden">Cargando...</span>
  //       </Spinner>
  //     </Container>
  //   );
  // }

  // if (error) {
  //   return (
  //     <Container className="my-5">
  //       <Alert variant="danger">{error}</Alert>
  //     </Container>
  //   );
  // }

  return (
    // <Container className="my-5">
    //   <h2>Mis Órdenes</h2>
    //   {ordenes.length === 0 ? (
    //     <Alert variant="info">No tienes órdenes registradas.</Alert>
    //   ) : (
    //     <Accordion defaultActiveKey="0">
    //       {ordenes.map((orden) => (
    //         <Accordion.Item eventKey={orden.id_venta.toString()} key={orden.id_venta}>
    //           <Accordion.Header onClick={() => fetchDetalles(orden.id_venta)}>
    //             Orden #{orden.id_venta} - {orden.descripcion || 'Sin descripción'} ({new Date(orden.fecha_registro).toLocaleDateString()})
    //           </Accordion.Header>
    //           <Accordion.Body>
    //             {detalles[orden.id_venta] ? (
    //               <Table striped bordered hover responsive>
    //                 <thead>
    //                   <tr>
    //                     <th>ID Producto</th>
    //                     <th>Cantidad</th>
    //                     <th>Precio Unitario</th>
    //                     <th>Descuento</th>
    //                     <th>Precio Final</th>
    //                   </tr>
    //                 </thead>
    //                 <tbody>
    //                   {detalles[orden.id_venta].map((detalle) => (
    //                     <tr key={detalle.id_venta_detalle}>
    //                       <td>{detalle.id_producto}</td>
    //                       <td>{detalle.cantidad}</td>
    //                       <td>${detalle.precio_venta.toLocaleString()}</td>
    //                       <td>${detalle.descuento.toLocaleString()}</td>
    //                       <td>${detalle.precio_final.toLocaleString()}</td>
    //                     </tr>
    //                   ))}
    //                 </tbody>
    //               </Table>
    //             ) : (
    //               <div className="text-center">
    //                 <Spinner animation="border" size="sm" /> Cargando detalles...
    //               </div>
    //             )}
    //           </Accordion.Body>
    //         </Accordion.Item>
    //       ))}
    //     </Accordion>
    //   )}
    // </Container>
    <>
      <div className="container mt-3 mx-auto container-custom">
        <h2 className="text-center mb-4">Detalles del Pedido:</h2>
        <div className="row justify-content-center">
          {ordenes.length === 0 ? (
            <p className="text-center">El carrito está vacío.</p>
          ) : (
            <Table className="table table-striped table-responsive">
              <thead>
                <tr>
                  <th scope="col"># Venta</th>
                  <th scope="col">Fecha Compra</th>
                  <th scope="col">Tipo Entrega</th>
                  <th scope="col">Dirección</th>
                  <th scope="col">Total Venta</th>
                </tr>
              </thead>
              <tbody>
                {ordenes.map((item) => (
                  <tr key={item.id_venta}>
                    <td scope="row">{item.id_venta}</td>
                    <td>{item.fecha_venta}</td>
                    <td>{item.tipo_entrega}</td>
                    <td>{item.direccion_envio}</td>
                    <td>{item.total_venta.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </>
  );
};

export default Ordenes;

