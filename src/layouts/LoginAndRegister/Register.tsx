import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Register = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage('')
      setError('Las contraseñas no son iguales.')
      return;
    }
    setError('')

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiUrl}/api/auth/register`, formData);

      if(response.status === 200) {
        setMessage('Se ha registrado con éxito!');
      } else {
        const errorText = response.data;
        setError(errorText);
      }
    } catch(err: any) {
      setMessage('')
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError('Ha ocurrido un error durante el registro.');
      }
    }
  }

  return (
    <div className='d-flex justify-content-center align-items-center flex-column flex-grow-1 bg-light'>
      <div
        className='card shadow p-4'
        style={{ width: '22rem', borderRadius: '1rem' }}
      >
        <h2 className='text-center mb-4'>Registro de usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Correo electrónico
            </label>
            <div className='input-group'>
              <span className='input-group-text'>
                <i className='fas fa-envelope'></i>
              </span>
              <input
                type='email'
                className='form-control'
                id='email'
                name='email'
                placeholder='Ingresa tu correo electrónico'
                value={formData.email}
                onChange={handleChange}
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
                <i className='fas fa-lock'></i>
              </span>
              <input
                type='password'
                className='form-control'
                id='password'
                name='password'
                placeholder='Ingresar contraseña'
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className='mb-3'>
            <label htmlFor='confirmPassword' className='form-label'>
              Confirmar contraseña
            </label>
            <div className='input-group'>
              <span className='input-group-text'>
                <i className='fas fa-lock'></i>
              </span>
              <input
                type='password'
                className='form-control'
                id='confirmPassword'
                name='confirmPassword'
                placeholder='Confirmar contraseña'
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {error && (
              <div className='alert alert-danger' role='alert'>
                  {error}
              </div>
            )}

          {message && (
              <div className='alert alert-success' role='alert'>
                  {message}
              </div>
            )}

          <button type='submit' className='btn btn-primary w-100'>
            Registrarse
          </button>
        </form>

        <div className='mt-3 text-center'>
          <p>
            <span>¿Ya tienes cuenta? </span>
            <Link to='/login' className='text-decoration-none'>
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
