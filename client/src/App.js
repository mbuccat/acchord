import React, { useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="App container-fluid p-0 m-0">
      <Nav />
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

function ReviewForm() {
  const [type, setType] = useState('song');
  const [query, setQuery] = useState('');

  function handleTypeChange(e) {
    setType(e.target.value);
  }

  function handleQueryChange(e) {
    setQuery(encodeURI(e.target.value));
  }


  return (
    <div className="row justify-content-center p-3 mb-2"> 
      <div className="ReviewForm col-sm-12 p-3 bg-white">
        <div className="form-inline">
          
        </div>
        <form className="form-inline">
          <label>I want to review &nbsp;</label>
          <select className="custom-select" onChange={handleTypeChange}>
            <option selected value="song">a song</option>
            <option value="artist">an artist</option>
            <option value="album">an album</option>
          </select>
          <div className="w-100"></div>
          <div className="form-group">
            <input type="string" className="form-control" id="" aria-describedby=""
              placeholder={`Which ${type}?`} onChange={handleQueryChange}/>
              <div>{query}</div>
          </div>
        </form>
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
