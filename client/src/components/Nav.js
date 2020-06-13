import React, { useContext } from 'react';
import UserContext from './UserContext';

function Nav() {
  const { user, setUser } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand px-3 border border-dark justify-content-between">
      <h1 className="navbar-brand m-0">acchord</h1>
      { user.username && user.token
        && (
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => {
            setUser({ username: null, token: null });
            localStorage.removeItem('acchordUsername');
            localStorage.removeItem('token');
          }}
        >
          Sign Out
        </button>
        )}
    </nav>
  );
}

export default Nav;
