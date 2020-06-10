import React, {
  useState, useMemo,
} from 'react';
import './App.css';
import Nav from './components/Nav';
import AuthBox from './components/AuthBox';
import InputBox from './components/InputBox';
import Feed from './components/Feed';
import UserContext from './components/UserContext'

function App() {
  const [user, setUser] = useState(null);
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div className="App container-fluid p-0 m-0">
      <Nav />
      <UserContext.Provider value={userValue}>
        {!user && <AuthBox />}
        {user && <InputBox />}
      </UserContext.Provider>
      <Feed />
    </div>
  );
}

export default App;
