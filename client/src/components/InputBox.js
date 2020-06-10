import React, {
  useState, useCallback, useEffect,
} from 'react';
import ReviewForm from './ReviewForm';
import SearchResults from './SearchResults';

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

export default InputBox;
