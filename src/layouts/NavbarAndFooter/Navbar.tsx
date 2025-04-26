import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
      <div className='container-fluid'>
        <span className='navbar-brand'>ZenTasker</span>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavDropdown'
          aria-expanded='false'
          aria-label='Toggle Navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/home'> Home </NavLink>
            </li>
          </ul>
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item m-1'>
              <NavLink type='button' className='btn btn-success w-100' to='/login'>
                Iniciar Sesión
              </NavLink>
            </li>
            <li className='nav-item m-1'>
              <NavLink type='button' className='btn btn-dark w-100' to='/register'>
                Regístrate
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
