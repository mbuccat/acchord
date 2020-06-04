import React, { useState, useCallback, useEffect } from 'react';
import './App.css';

function App() {
  return (
    <div className="App container-fluid p-0 m-0">
      <Nav />
      <SearchForm />
      <ReviewForm />
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

function SearchForm() {
  const [type, setType] = useState('track');
  const [query, setQuery] = useState();

  function handleTypeChange(e) {
    setType(e.target.value);
  }
  
  const handleSubmit = useCallback(e => {
    e.preventDefault();
    setQuery(e.target.elements.query.value)
    }, [setQuery]
  );

  // when the user makes a search query, send to server
  useEffect(() => {
    if (query) {
      fetch('http://localhost:3001/api/search', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ query: query }),
      })
        .then(response => response.json())
        .then(responseJson => console.log(responseJson));
    }
  }, [query]);

  return (
    <div className="row justify-content-center p-3 mb-2"> 
      <div className="ReviewForm col-sm-12 p-3 bg-white">
        <form className="form-inline" onSubmit={handleSubmit}>
          <label className="h3">I want to review &nbsp;</label>
          <select className="custom-select" onChange={handleTypeChange}>
            <option defaultValue value="track">a track</option>
            <option value="artist">an artist</option>
            <option value="album">an album</option>
          </select>
          <div className="w-100"></div>
          <div className="form-group">
            <input type="string" className="form-control" id="" name="query" aria-describedby=""
              placeholder={`Which ${type}?`}/>
          </div>
        </form>
      </div>
    </div>  
  );
}

function ReviewForm() {
  return(
    <div className="row justify-content-center p-3 mb-2"> 
      <div className="ReviewForm col-sm-12 p-3 bg-white">
        <form>
          <div className="form-group">
            <textarea className="form-control" id="" rows="3" placeholder="Your review" />
          </div>
          <button type="button" className="btn btn-dark">Submit</button>
        </form>
      </div>
    </div>
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
