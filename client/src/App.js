import React, {
  useState, useMemo, useEffect,
} from 'react';
import './App.css';
import Nav from './components/Nav';
import AuthBox from './components/AuthBox';
import InputBox from './components/InputBox';
import Feed from './components/Feed';
import UserContext from './components/UserContext';

function App() {
  const [user, setUser] = useState({
    username: localStorage.getItem('acchordUsername'),
    token: localStorage.getItem('token'),
  });
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    if (user.token) {
      fetch('http://localhost:3001/auth/token', {
        method: 'POST',
        body: JSON.stringify({ token: user.token }),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then((error) => {
            throw new Error(error);
          });
        })
        .then((responseJson) => {
          console.log(responseJson);
        })
        .catch((error) => {
          localStorage.removeItem('token');
          localStorage.removeItem('acchordUsername');
          setUser({ username: null, token: null });
          console.log(error.message);
        });
    }
  }, [user.token, setUser]);

  return (
    <div className="App container-fluid p-0 m-0">
      <Nav />
      <UserContext.Provider value={userValue}>
        {user.username
          ? (
            <div className="row justify-content-center px-3 mt-3">
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
        {!user.username && !user.token && <AuthBox />}
        {user.username && user.token && <InputBox />}
      </UserContext.Provider>
      <Feed />
    </div>
  );
}

export default App;
