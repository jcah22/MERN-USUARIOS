import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const CrearUsuarios = () => {
  const valorInicial = {
    nombre: "",
    apellido: "",
    edad: 0,
    telefono: "",
    correo: "",
  };

  let { id } = useParams();

  const [usuario, setUsuario] = useState(valorInicial);
  const [subId, setSubId] = useState(id);
  const capturarDatos = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const guardarDatos = async (e) => {
    e.preventDefault();
    //crear la logica para la peticion post
    const newUser = {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      edad: usuario.edad,
      telefono: usuario.telefono,
      correo: usuario.correo,
    };

    await axios.post("http://localhost:4000/api/usuarios", newUser);

    setUsuario({ ...valorInicial });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Usuario creado correctamente!!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  //funcion para actualizar el usuario
  const actualizarUser = async (e) => {
    e.preventDefault();
    const newUser = {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      edad: usuario.edad,
      telefono: usuario.telefono,
      correo: usuario.correo,
    };
    await axios.put("http://localhost:4000/api/usuarios" + subId, newUser);
    setUsuario({ ...valorInicial });
    setSubId("");
  };

  const obtUno = async (valorId) => {
    const res = await axios.get(
      "http://localhost:4000/api/usuarios/" + valorId
    );
    setUsuario({
      nombre: res.data.nombre,
      apellido: res.data.apellido,
      telefono: res.data.telefono,
      edad: res.data.edad,
      correo: res.data.correo,
    });
  };

  // logica para hacer unapeticion a la api
  useEffect(() => {
    if (subId !== "") obtUno(subId);
  }, [subId]);

  return (
    <>
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <form onSubmit={guardarDatos}>
            <h2 className="text-center">Crear Usuario</h2>
            <div className="mb-3">
              <label>Nombre:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingresar el nombre del usuario"
                name="nombre"
                value={usuario.nombre}
                onChange={capturarDatos}
              ></input>
            </div>

            <div className="mb-3">
              <label>Apellido:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingresar el apellido del usuario"
                name="apellido"
                value={usuario.apellido}
                onChange={capturarDatos}
              ></input>
            </div>

            <div className="mb-3">
              <label>Edad:</label>
              <input
                type="number"
                className="form-control"
                placeholder="Ingresar la edad del usuario"
                name="edad"
                value={usuario.edad}
                onChange={capturarDatos}
              ></input>
            </div>

            <div className="mb-3">
              <label>Telefono:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingresar el telefono del usuario"
                name="telefono"
                value={usuario.telefono}
                onChange={capturarDatos}
              ></input>
            </div>

            <div className="mb-3">
              <label>Correo:</label>
              <input
                type="email"
                className="form-control"
                placeholder="Ingresar el correo del usuario"
                name="correo"
                value={usuario.correo}
                onChange={capturarDatos}
              ></input>
            </div>

            <button className="btn btn-primary form-control">
              Guardar Usuario
            </button>
          </form>

          <form onSubmit={actualizarUser}>
            <button className="btn btn-success form-control mt-2">
              Actualizar Informacion
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CrearUsuarios;
