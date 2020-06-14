import React, { useState, useContext, useEffect } from 'react';
import UserContext from './UserContext';

const Joi = require('@hapi/joi');

const schema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .trim()
    .min(8)
    .max(20)
    .required(),
});

function AuthBox() {
  const { setUser } = useContext(UserContext);
  const [displaySignUp, setDisplaySignUp] = useState(false);
  const [displayLogIn, setDisplayLogIn] = useState(true);
  const [validatedUserInput, setValidatedUserInput] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const username = e.target.form.username.value;
      const password = e.target.form.password.value;
      const { error } = await schema.validate({ username, password });

      if (error === undefined) {
        setValidatedUserInput({ username, password });
        setErrorMessage('');
      } else {
        throw error;
      }
    } catch (error) {
      const item = error.message.includes('username') ? 'username' : 'password';
      const message = displaySignUp
        ? `Please make sure your ${item} meets the requirements.`
        : 'Error with username or password.';
      setErrorMessage(message);
    }
  };

  useEffect(() => {
    if (validatedUserInput && displaySignUp) {
      fetch('http://localhost:3001/auth/signup', {
        method: 'POST',
        body: JSON.stringify(validatedUserInput),
        headers: {
          'content-type': 'application/json',
        },
      }).then((response) => {
        if (response.ok) {
          setValidatedUserInput(null);
          setSuccessMessage('Account created! Please log in.');
          setDisplaySignUp(false);
          setDisplayLogIn(true);
          return undefined;
        }
        return response.json().then((error) => {
          throw new Error(error.message);
        });
      }).catch((error) => {
        const message = error.message.includes('fetch')
          ? 'Something went wrong! Please try again later.'
          : error.message;
        setErrorMessage(message);
      });
    } else if (validatedUserInput && displayLogIn) {
      fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        body: JSON.stringify(validatedUserInput),
        headers: {
          'content-type': 'application/json',
        },
      }).then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((error) => {
          throw new Error(error.message);
        });
      }).then((responseJson) => {
        localStorage.token = responseJson.token;
        localStorage.setItem('acchordUsername', validatedUserInput.username);
        setUser({
          username: validatedUserInput.username,
          token: responseJson.token,
        });
      }).catch((error) => {
        const message = error.message.includes('fetch')
          ? 'Something went wrong! Please try again later.'
          : error.message;
        setErrorMessage(message);
      });
    }
  }, [validatedUserInput, displaySignUp, displayLogIn, setUser]);

  return (
      <div className="p-4 border border-dark rounded">
        { errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
        )}
        { successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
        )}
        {displaySignUp
         && (
         <form id="signUpForm">
           <h2>Sign Up</h2>
           <div className="form-group">
             <label htmlFor="username">Username</label>
             <input type="username" className="form-control" id="username" aria-describedby="usernameHelp" placeholder="Enter a username" />
             <small id="usernameHelp" className="form-text text-muted">Must be 3 to 20 characters.</small>
           </div>
           <div className="form-group">
             <label htmlFor="password">Password</label>
             <input type="password" className="form-control" id="password" aria-describedby="passwordHelp" placeholder="Enter a password" />
             <small id="passwordHelp" className="form-text text-muted">Must be 8 to 20 characters.</small>
           </div>
           <button type="submit" form="signUpForm" className="btn-sm btn-dark" onClick={handleFormSubmit}>Sign Up</button>
         </form>
         )}
        {displayLogIn
          && (
          <form id="logInForm">
            <h2>Log In</h2>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="username" className="form-control" id="username" placeholder="Enter your username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Enter your password" />
            </div>
            <button type="submit" form="logInForm" className="btn-sm btn-dark" onClick={handleFormSubmit}>Log In</button>
            <div className="w-100" />
            <button
              type="button"
              className="btn btn-link text-muted px-0"
              onClick={(e) => {
                e.preventDefault();
                setDisplayLogIn(false);
                setDisplaySignUp(true);
              }}
            >
              Sign up for an account
            </button>
          </form>
          )}
      </div>
  );
}

export default AuthBox;
