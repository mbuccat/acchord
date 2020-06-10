import React, {
  useState, useCallback, useEffect, useContext, useMemo,
} from 'react';
import './App.css';
import Nav from './components/Nav';
import Feed from './components/Feed';
import ReviewForm from './components/ReviewForm';
import SearchResults from './components/SearchResults';

const UserContext = React.createContext();

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

function InputBox() {
  const [query, setQuery] = useState();
  const [searchResults, setSearchResults] = useState('Searching...');
  const [mediaType, setMediaType] = useState('track');
  const [mediaName, setMediaName] = useState('default');
  const [mediaCreator, setMediaCreator] = useState('default');
  const [displaySearchForm, setDisplaySearchForm] = useState(true);
  const [displayResults, setDisplayResults] = useState(false);
  const [displayReviewForm, setDisplayReviewForm] = useState(false);

  function handleMediaTypeChange(e) {
    setMediaType(e.target.value);
  }

  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    setQuery(e.target.query.value);
  }, [setQuery]);

  const handleButtonClick = useCallback((e) => {
    e.preventDefault();
    setMediaName(e.target.dataset.medianame);
    setMediaCreator(e.target.dataset.mediacreator);
    setDisplayResults(false);
    setDisplayReviewForm(true);
  }, [setMediaName, setMediaCreator]);

  const createSearchResultsDisplay = useCallback((jsonFromApi) => {
    const { data } = jsonFromApi;

    if (data == false) {
      setSearchResults('No matches found. Please be more specific with your search.');
    } else if (mediaType === 'artist') {
      setSearchResults(data.map((item) => (
        <li>
          <button
            type="button"
            className="btn btn-dark mb-2 btn-sm w-100 text-left"
            onClick={handleButtonClick}
            data-medianame=""
            data-mediacreator={item.name}
          >
            {item.name}
          </button>
        </li>
      )));
    } else {
      setSearchResults(data.map((item) => (
        <li>
          <button
            type="button"
            className="btn btn-dark mb-2 btn-sm w-100 text-left"
            onClick={handleButtonClick}
            data-medianame={item.title}
            data-mediacreator={item.artist.name}
          >
            {item.title}
            {' '}
            by
            {' '}
            {item.artist.name}
          </button>
        </li>
      )));
    }
  }, [setSearchResults, handleButtonClick, mediaType]);

  // when the user makes a search query, send to server
  useEffect(() => {
    if (query) {
      try {
        setDisplaySearchForm(false);
        setDisplayResults(true);

        fetch('http://localhost:3001/api/search', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ query, mediaType }),
        })
          .then((response) => response.json())
          .then((responseJson) => createSearchResultsDisplay(responseJson.jsonFromMusicApi));
      } catch (err) {
        console.log(err);
      }
    }
  }, [query, mediaType, createSearchResultsDisplay]);

  return (
    (
      <div className="row justify-content-center p-4 mb-0">
        { displaySearchForm
            && (
            <div className="InputBox col-sm-12 p-4 border border-dark rounded">
              <form className="" onSubmit={handleSearchSubmit}>
                <h2>I want to review:</h2>
                <div className="w-100" />
                <div className="input-group">
                  <div className="input-group-prepend">
                    <select className="custom-select" onChange={handleMediaTypeChange}>
                      <option defaultValue value="track">a track</option>
                      <option value="artist">an artist</option>
                      <option value="album">an album</option>
                    </select>
                  </div>
                  <input
                    type="string"
                    className="form-control"
                    id=""
                    name="query"
                    aria-describedby=""
                    placeholder={`Which ${mediaType}?`}
                  />
                </div>
              </form>
            </div>
            )}
        {displayResults && <SearchResults searchResults={searchResults} />}
        {displayReviewForm
          && <ReviewForm mediaName={mediaName} mediaCreator={mediaCreator} mediaType={mediaType} />}
      </div>
    )
  );
}

export default App;
