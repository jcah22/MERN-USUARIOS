import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ListaUsuario = () => {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const getUsuarios = async () => {
      const res = await axios.get("http://localhost:4000/api/usuarios");
      setLista(res.data);
    };
    getUsuarios();
  }, [lista]);

  const eliminarUsuario = async (id) => {
    try {
      Swal.fire({
        title: "Estas seguro?",
        text: "se eliminara permanentemente!!!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminar!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Eliminado!", "el Usuario ha sido Eliminado!!", "success");
        }
      });
      await axios.delete("http://localhost:4000/api/usuarios/" + id);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El usuario no pudo ser Eliminado",
      });
    }
  };

  return (
    <>
      <div className="row">
        {lista.map((list) => (
          <div className="col-md-4 p-2" key={list._id}>
            <div className="card">
              <div className="card-header">
                <h5>Nombre: {list.nombre}</h5>
              </div>
              <div className="card-body">
                <p>Apellido: {list.apellido}</p>
                <p>Edad: {list.edad}</p>
                <p>Telefono: {list.telefono}</p>
                <p>Correo: {list.correo}</p>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-danger"
                  onClick={() => eliminarUsuario(list._id)}
                >
                  Eliminar
                </button>

                <Link className="btn btn-primary m-1 " to={"/edit/" + list._id}>
                  Editar
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListaUsuario;
