import { Link } from 'react-router-dom';

export const Login = () => {
    return (
        <div className='d-flex justify-content-center align-items-center flex-column flex-grow-1 bg-light'>
            <div
                className='card shadow p-4'
                style={{ width: '22rem', borderRadius: '1rem' }}
            >
                <h2 className='text-center mb-4'>Iniciar sesión</h2>
                <form>
                <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>
                    Correo electrónico
                    </label>
                    <div className='input-group'>
                    <span className='input-group-text'>
                        <i className='fas fa-user'></i> {/* Icono de usuario */}
                    </span>
                    <input
                        type='email'
                        className='form-control'
                        id="email"
                        name="email"
                        placeholder='Ingresa tu correo electrónico'
                    />
                    </div>
                </div>

                <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>
                    Contraseña
                    </label>
                    <div className='input-group'>
                    <span className='input-group-text'>
                        <i className='fas fa-lock'></i> {/* Icono de candado */}
                    </span>
                    <input
                        type='password'
                        className='form-control'
                        id='password'
                        placeholder='Ingresa tu contraseña'
                    />
                    </div>
                </div>

                <div className='d-flex justify-content-between mb-3'>
                    <div className='form-check'>
                    <input
                        type='checkbox'
                        className='form-check-input'
                        id='rememberMe'
                    />
                    <label className='form-check-label' htmlFor='rememberMe'>
                        Recuérdame
                    </label>
                    </div>
                    <a href='#' className='text-decoration-none'>
                    ¿Olvidaste tu contraseña?
                    </a>
                </div>

                <button type='submit' className='btn btn-primary w-100'>
                    Iniciar sesión
                </button>
                </form>

                <div className='mt-3 text-center'>
                <p>
                    <span>¿No tienes cuenta? </span>
                    <Link to='/register' className='text-decoration-none'> Regístrate aquí </Link>
                </p>
                </div>
            </div>
        </div>
      );
};
