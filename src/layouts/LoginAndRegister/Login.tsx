import axios from "axios";
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LoginModel from "../../models/LoginModel";

export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleLogin = async (e: any) => {
        e.preventDefault()

        setError('')

        const loginData = new LoginModel(email, password);

        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.post(`${apiUrl}/api/auth/login`, loginData);

            if (response.status === 200) {
                history.push('/tasks');
            } else {
                const errorText = response.data;
                setError(errorText);
            }
        } catch(err: any) {
            if (err.response && err.response.data) {
                setError(err.response.data);
              } else {
                setError('Ha ocurrido un error durante el inicio de sesión.');
              }
        }

    }

    return (
        <div className='d-flex justify-content-center align-items-center flex-column flex-grow-1 bg-light'>
            <div
                className='card shadow p-4'
                style={{ width: '22rem', borderRadius: '1rem' }}
            >
                <h2 className='text-center mb-4'>Iniciar sesión</h2>
                <form onSubmit={handleLogin}>
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    </div>
                </div>

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

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
