import React, { useState, useEffect } from 'react';

function Feed() {
  const [feed, setFeed] = useState([]);

  // for each post in the results array, create an li
  const createFeed = (results) => {
    setFeed(
      results.reverse().map(({
        content, created, mediaCreator, mediaName,
      }) => {
        const reviewHeader = mediaName === ''
          ? `Review of ${mediaCreator}`
          : `Review of ${mediaName} by ${mediaCreator}`;

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

export default Feed;
