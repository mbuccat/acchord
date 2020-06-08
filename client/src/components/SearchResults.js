import React from 'react';

function SearchResults({ searchResults }) {
  return (
    <div className="InputBox col-sm-12 p-4 border border-dark rounded">
      <ul className="list-group list-unstyled">
        <h2>Did you mean:</h2>
        {searchResults}
      </ul>
    </div>
  );
}

export default SearchResults;
