import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column flex-grow-1 bg-light">
      <div
        className="card shadow p-4"
        style={{ width: "22rem", borderRadius: "1rem" }}
      >
        <h2 className="text-center mb-4">Registro de usuario</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Nombre de usuario
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-user"></i>
              </span>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Ingresa tu nombre de usuario"
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Ingresa tu correo electrónico"
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Crea una contraseña"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Registrarse
          </button>
        </form>

        <div className="mt-3 text-center">
          <p>
            <span>¿Ya tienes cuenta? </span>
            <Link to="/login" className="text-decoration-none">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
