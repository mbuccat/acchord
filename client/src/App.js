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
    <nav className="navbar navbar-expand navbar-light bg-white mb-4">
      <span className="navbar-brand mb-0 h1">acchord</span>
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
    setQuery(e.target.elements.query.value);
  }, [setQuery]);

  const handleButtonClick = useCallback((e) => {
    e.preventDefault();
    setMediaName(e.target.dataset.medianame);
    setMediaCreator(e.target.dataset.mediacreator);
    setDisplayResults(false);
    setDisplayReviewForm(true);
  }, [setMediaName, setMediaCreator]);

  const addToSearchResults = useCallback((jsonFromApi, mediaType) => {
    const { data } = jsonFromApi;

    if (data == false) {
      setSearchResults('No matches found. Please be more specific with your search.');
    } else if (mediaType === 'track') {
      setSearchResults(data.map((item) =>
        <li>
          <button
            type="button"
            className="btn btn-primary mb-2"
            onClick={handleButtonClick}
            data-medianame={item.title}
            data-mediacreator={item.artist.name}
          >
            {item.title} by {item.artist.name}
          </button>
        </li>));
    } else if (mediaType === 'artist') {
      setSearchResults(data.map((item) =>
        <li>
          <button
            type="button"
            className="btn btn-primary mb-2"
            onClick={handleButtonClick}
            data-medianame=""
            data-mediacreator={item.name}
          >
            {item.name}
          </button>
        </li>));
    } else if (mediaType === 'album') {
      setSearchResults(data.map((item) =>
        <li>
          <button
            type="button"
            className="btn btn-primary mb-2"
            onClick={handleButtonClick}
            data-medianame={item.title}
            data-mediacreator={item.artist.name}
          >
            {item.title} by {item.artist.name}
          </button>
        </li>));
    }
  }, [setSearchResults, handleButtonClick]);

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
          .then((responseJson) => addToSearchResults(responseJson.jsonFromMusicApi, mediaType));
      } catch (err) {
        console.log(err);
      }
    }
  }, [query, mediaType, addToSearchResults]);

  return (
    (
      <div className="row justify-content-center p-3 mb-2">
        <div className="SearchForm col-sm-12 p-3 bg-white">
          { displaySearchForm
            && (
              <form className="form-inline" onSubmit={handleSubmit}>
                <h3>I want to review &nbsp;</h3>
                <select className="custom-select" onChange={handleMediaTypeChange}>
                  <option defaultValue value="track">a track</option>
                  <option value="artist">an artist</option>
                  <option value="album">an album</option>
                </select>
                <div className="w-100" />
                <div className="form-group">
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
            )
          }
          {displayResults && <div>{searchResults}</div>}
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
      const reviewData = {
        mediaType,
        mediaName,
        mediaCreator,
        content,
        created: new Date(),
      };
    }
  }, [mediaCreator, mediaName, mediaType, content]);

  return (
    display && (
    <div className="row justify-content-center p-3 mb-2">
      <div className="ReviewForm col-sm-12 p-3 bg-white">
        <h2>
          {reviewHeader}
        </h2>
        <form id="review-form">
          <textarea className="form-control" id="reviewtext" rows="3" placeholder="Your review" />
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
    </div>
    )
  );
}

function Feed() {
  return (
    <div className="row justify-content-center p-3 mb-4">
      <div className="Feed p-3 bg-white">
        <h2>Recent reviews</h2>
        <ul className="list-unstyled">
          <li className="media">
            <img className="mr-3" src=".../64x64" alt="profile" />
            <div className="media-body">
              <h5 className="mt-0 mb-1">Sample post</h5>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Etiam ac tortor vitae odio faucibus mollis vitae et dui.
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
