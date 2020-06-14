import React from 'react';

function SearchResults({ searchResults }) {
  return (
    <div className="col-sm-12 p-4 border border-dark rounded">
      <ul className="list-group list-unstyled">
        <h2>Did you mean:</h2>
        {searchResults}
      </ul>
      <button
        type="button"
        className="btn btn-danger"
        onClick={(e) => {
          e.preventDefault();
          window.location.reload(false);
        }}
      >
        Cancel
      </button>
    </div>
  );
}

export default SearchResults;
