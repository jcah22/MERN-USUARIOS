import React from "react";
import { Link } from "react-router-dom";

const Navegacion = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg  bg-dark" data-bs-theme="dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Usuarios
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="navbar-link" to="/">
                  LISTA USUARIOS
                </Link>
              </li>
              <li className="nav-item">
                <Link className=" ms-5 navbar-link" to="/CrearUsuario">
                  CREAR USUARIOS
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navegacion;
