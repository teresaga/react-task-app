import { NavLink, useHistory } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

export const Navbar = () => {

  const { token } = useAuth();
  const {logout} = useAuth();
  const history = useHistory();

  const logoutUser = () => {
    logout();
    history.push('/home');
  }

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
          
          <ul className='navbar-nav ms-auto'>
            {!token && (
            <>
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
            </>
            )}
            {token && (
              <li className='nav-item m-1'>
                <button type='button' className='btn btn-dark w-100' onClick={logoutUser}>
                  Logout
                </button>
              </li>
            )}
          </ul>
          
        </div>
      </div>
    </nav>
  );
};
