import React, {
  useState, useMemo, useEffect,
} from 'react';
import Nav from './components/Nav';
import AuthBox from './components/AuthBox';
import SearchBox from './components/SearchBox';
import Feed from './components/Feed';
import UserContext from './components/UserContext';

const API_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:3001'
  : 'https://acchord.herokuapp.com';

function App() {
  const [user, setUser] = useState({
    username: localStorage.getItem('acchordUsername'),
    token: localStorage.getItem('token'),
  });
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  // verify token,
  // clear localStorage if the token is not from the server
  useEffect(() => {
    if (user.token) {
      fetch(`${API_URL}/auth/token`, {
        method: 'POST',
        body: JSON.stringify({ token: user.token }),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            return undefined;
          }
          throw new Error('Unable to verify token.');
        })
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('acchordUsername');
          setUser({ username: null, token: null });
        });
    }
  }, [user.token, setUser]);

  // display welcome message and search/review form if user is signed in
  return (
    <div className="App container-fluid p-0 m-0">
      <UserContext.Provider value={userValue}>
        <Nav />
        {user.username
          ? (
            <div className="row px-4 mt-3">
              <div className="Welcome col-sm-12">
                <h1 className="mb-0">
                  Welcome,
                  {' '}
                  {user.username}
                  .
                </h1>
              </div>
            </div>
          )
          : <div />}
        <div className="row justify-content-center px-4 py-0">
          <div className="col-12 order-12 col-lg-8 order-lg-1 pt-3">
            <Feed />
          </div>
          <div className="col-12 order-1 col-lg-4 order-lg-12 pt-3">
            {!user.username && !user.token && <AuthBox />}
            {user.username && user.token && <SearchBox />}
          </div>
        </div>
      </UserContext.Provider>
    </div>
  );
}

export { App, API_URL };
