import React, { useState, useCallback, useEffect } from 'react';
import './App.css';

function App() {
  return (
    <div className="App container-fluid p-0 m-0">
      <Nav />
      <NewReviewForm />
      <Feed />
    </div>
  );
}

function Nav() {
  return (
    <nav className="navbar navbar-expand px-2 border border-dark" style={{background: '#ffffff'}}>
      <h1 className="navbar-brand m-0 px-3">acchord</h1>
    </nav>
  );
}

function NewReviewForm() {
  const [mediaType, setMediaType] = useState('track');
  const [query, setQuery] = useState();
  const [searchResults, setSearchResults] = useState('Searching...');
  const [displaySearchForm, setDisplaySearchForm] = useState(true);
  const [displayResults, setDisplayResults] = useState(false);
  const [displayReviewForm, setDisplayReviewForm] = useState(false);
  const [mediaName, setMediaName] = useState('default');
  const [mediaCreator, setMediaCreator] = useState('default');

  function handleMediaTypeChange(e) {
    setMediaType(e.target.value);
  }

  const handleSubmit = useCallback((e) => {
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
    } else if (mediaType === 'track') {
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
    } else if (mediaType === 'album') {
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
        <div className="SearchForm col-sm-12 p-4 border border-dark rounded">
          { displaySearchForm
            && (
              <form className="" onSubmit={handleSubmit}>
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
            )}
          {displayResults
            && (
            <ul className="list-group list-unstyled">
              <h2>Did you mean:</h2>
              {searchResults}
            </ul>
            )}
          {displayReviewForm
          && <ReviewForm mediaName={mediaName} mediaCreator={mediaCreator} mediaType={mediaType} />}
        </div>
      </div>
    )
  );
}

function ReviewForm(props) {
  const { mediaName, mediaCreator, mediaType } = props;
  const reviewHeader = mediaName === '' ? `Reviewing ${mediaCreator}` : `Reviewing ${mediaName} by ${mediaCreator}`;
  const [content, setContent] = useState();
  const [display, setDisplay] = useState(true);

  const handleButtonClick = useCallback((e) => {
    setContent(e.target.form.reviewtext.value);
  }, [setContent]);

  useEffect(() => {
    if (content) {
      setDisplay(false);

      fetch('http://localhost:3001/api/reviews', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          mediaType,
          mediaName,
          mediaCreator,
          content,
        }),
      });
    }
  }, [mediaCreator, mediaName, mediaType, content]);

  return (
    display && (
      <div className="ReviewForm">
        <h2>
          {reviewHeader}
        </h2>
        <form id="review-form">
          <textarea className="form-control mb-1" id="reviewtext" rows="3" placeholder="Your review" />
          <button
            type="button"
            form="review-form"
            className="btn btn-dark"
            onClick={handleButtonClick}
          >
            Submit
          </button>
        </form>
      </div>
    )
  );
}

function Feed() {
  const [feed, setFeed] = useState([]);

  // for each post in the results array, create an li
  const createFeed = (results) => {
    setFeed(
      results.reverse().map(({
        content, created, mediaCreator, mediaName,
      }) => {
        const reviewHeader = mediaName === '' ? `Review of ${mediaCreator}` : `Review of ${mediaName} by ${mediaCreator}`;
        return (
          <li className="media mb-5">
            <img className="mr-3" src=".../64x64" alt="profile" />
            <div className="media-body">
              <h5 className="mt-0 mb-1">{reviewHeader}</h5>
              {content}
              {' '}
              <br />
              <small>{(new Date(created)).toLocaleString()}</small>
            </div>
          </li>
        );
      }),
    );
  };

  useEffect(() => {
    fetch('http://localhost:3001/api/reviews')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
      })
      .then((responseJson) => {
        const { results } = responseJson;
        createFeed(results);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="row justify-content-center py-0 px-4">
      <div className="Feed col-sm-12 p-4 border border-dark rounded">
        <h2>Recent reviews</h2>
        <ul className="list-unstyled">
          {feed}
        </ul>
      </div>
    </div>
  );
}

export default App;
