import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { useEffect } from 'react';

export const HomePage = () => {
  
    const history = useHistory();
      const { token } = useAuth(); 
    
      useEffect(() => {
        if (token) {
          history.push('/tasks');
        }
      }, [token, history]);
      
  return (
    <div title='Foto de Kier in Sight Archives en unsplash.com'>
      <div
        className='container-fluid py-5 text-white 
                d-flex justify-content-center align-items-center'
      >
        <div>
          <h1>¡Registra tus tareas y despeja tu mente!</h1>
          <p className='col-md-8 fs-4'>¿Quieres empezar ahora?</p>
          <Link
            type='button'
            className='btn main-color btn-lg text-white'
            to='/register'
          >
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
};
