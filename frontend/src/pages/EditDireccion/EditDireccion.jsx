import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserContext";
import { updateDireccion } from "../../Tools/direccionTools";

const EditDireccion = () => {
  const { id } = useParams();
  const { token } = useContext(UserContext);
  const [form, setForm] = useState({
    direccion: "",
    numero: "",
    anexo: "",
    id_region: "",
    id_comuna: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/direccion/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("No se pudo cargar la dirección");
        const { data } = await res.json();
        setForm(data[0]);
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, token]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDireccion(id, form, token);
      Swal.fire("Éxito", "Dirección actualizada.", "success").then(() =>
        navigate("/profile/address")
      );
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  if (loading) return <p className="text-center mt-5">Cargando…</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow mx-auto" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          <h3 className="card-title mb-4 text-center">Editar dirección</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Dirección</label>
              <input
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Número</label>
              <input
                name="numero"
                value={form.numero}
                onChange={handleChange}
                type="number"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Anexo</label>
              <input
                name="anexo"
                value={form.anexo || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">ID Región</label>
              <input
                name="id_region"
                value={form.id_region}
                onChange={handleChange}
                type="number"
                required
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">ID Comuna</label>
              <input
                name="id_comuna"
                value={form.id_comuna}
                onChange={handleChange}
                type="number"
                required
                className="form-control"
              />
            </div>

            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(-1)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDireccion;
