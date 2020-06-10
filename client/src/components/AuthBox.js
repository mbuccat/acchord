import React, { useState, useContext } from 'react';
import UserContext from './UserContext';

function AuthBox() {
  const { user, setUser } = useContext(UserContext);
  const [displaySignUp, setDisplaySignUp] = useState(false);
  const [displayLogIn, setDisplayLogIn] = useState(false);

  const handleSignUp = () => {
    setDisplaySignUp(true);
  };

  const handleLogIn = () => {
    setDisplayLogIn(true);
  };

  return (
    <div className="row justify-content-center p-4 mb-0">
      <div className="AuthBox col-sm-12 p-4 border border-dark rounded">
        {!displaySignUp && !displayLogIn && (
        <div>
          <button className="btn-sm btn-dark" onClick={handleSignUp} type="button">Sign up</button>
          {' '}
          or
          {' '}
          <button className="btn-sm btn-dark" onClick={handleLogIn} type="button">Log in</button>
          {' '}
          to post reviews.
        </div>
        )}
        {displaySignUp
         && (
         <form>
           <h2>Sign Up</h2>
           <div className="form-group">
             <label htmlFor="username">Username</label>
             <input type="username" className="form-control" id="username" aria-describedby="" placeholder="Enter a username" />
             <small id="usernameHelp" className="form-text text-muted">Must be 3 to 20 characters.</small>
           </div>
           <div className="form-group">
             <label htmlFor="password">Password</label>
             <input type="password" className="form-control" id="password" placeholder="Enter a password" />
             <small id="passwordHelp" className="form-text text-muted">Must be 8 to 20 characters.</small>
           </div>
           <button type="submit" className="btn-sm btn-dark">Sign Up</button>
         </form>
         )}
        {displayLogIn
          && (
          <form>
            <h2>Log In</h2>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="username" className="form-control" id="username" aria-describedby="" placeholder="Enter your username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Enter your password" />
            </div>
            <button type="submit" className="btn-sm btn-dark">Log In</button>
          </form>
          )}
      </div>
    </div>
  );
}

export default AuthBox;
