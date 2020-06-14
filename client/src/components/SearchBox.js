import React, {
  useState, useCallback, useEffect, useContext,
} from 'react';
import ReviewForm from './ReviewForm';
import SearchResults from './SearchResults';
import { querySchema } from '../schema';
import UserContext from './UserContext';

function SearchBox() {
  const { user } = useContext(UserContext);
  const [query, setQuery] = useState();
  const [searchResults, setSearchResults] = useState('Searching...');
  const [mediaType, setMediaType] = useState('track');
  const [mediaName, setMediaName] = useState('default');
  const [mediaCreator, setMediaCreator] = useState('default');
  const [displaySearchForm, setDisplaySearchForm] = useState(true);
  const [displayResults, setDisplayResults] = useState(false);
  const [displayReviewForm, setDisplayReviewForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // store whether the user wants to search for a song or album
  function handleMediaTypeChange(e) {
    setMediaType(e.target.value);
  }

  // store the user's query if it is valid against the query schema,
  // this will trigger useEffect()
  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    const input = e.target.query.value;
    const { error } = querySchema.validate(input);

    if (error === undefined) {
      setQuery(input);
    } else {
      const message = error.message.includes('50')
        ? 'Please shorten your query.'
        : 'Please check your query.';
      setErrorMessage(message);
    }
  }, [setQuery]);

  // when the user selects a song or album from the search results,
  // display a blank review form for that item
  const handleButtonClick = useCallback((e) => {
    e.preventDefault();
    setMediaName(e.target.dataset.medianame);
    setMediaCreator(e.target.dataset.mediacreator);
    setDisplayResults(false);
    setDisplayReviewForm(true);
  }, [setMediaName, setMediaCreator]);

  // create a button for each search result item,
  // so the user can select which item they want to review,
  // the list of buttons will be passed to the SearchResults component
  const createSearchResultsDisplay = useCallback((jsonFromApi) => {
    const { data } = jsonFromApi;

    if (data.length === 0) {
      setSearchResults((<div className="alert alert-danger">No matches found.</div>));
    } else {
      setSearchResults(data.map((item) => (
        <li>
          <button
            type="button"
            className="btn btn-light mb-2 btn-sm w-100 text-left"
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
  }, [setSearchResults, handleButtonClick]);

  // when the user makes a search query, send to server
  useEffect(() => {
    if (query) {
      try {
        setDisplaySearchForm(false);
        setDisplayResults(true);
        setErrorMessage('');

        fetch('http://localhost:3001/api/search', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ query, mediaType, token: user.token }),
        })
          .then((response) => response.json())
          .then((responseJson) => createSearchResultsDisplay(responseJson.jsonFromMusicApi));
      } catch (err) {
        setErrorMessage('Unable to get search results.');
      }
    }
  }, [query, mediaType, createSearchResultsDisplay, user.token]);

  return (
    (
      <div>
        { displaySearchForm
            && (
            <div className="p-4 border border-dark rounded">
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              <form onSubmit={handleSearchSubmit}>
                <h2>I want to review:</h2>
                <div className="w-100" />
                <div className="input-group">
                  <div className="input-group-prepend">
                    <select className="custom-select" onChange={handleMediaTypeChange}>
                      <option defaultValue value="track">a track</option>
                      <option value="album">an album</option>
                    </select>
                  </div>
                  <input
                    type="string"
                    className="form-control"
                    name="query"
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

export default SearchBox;
