import { Link } from 'react-router-dom';

export const HomePage = () => {
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
