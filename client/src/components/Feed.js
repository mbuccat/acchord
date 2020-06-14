import React, { useState, useEffect } from 'react';
import album from './img/album.png';
import track from './img/track.png';

function Feed() {
  const [feed, setFeed] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // for each post in the results array, create an li
  const createFeed = (results) => {
    setFeed(
      results.reverse().map(({
        content, created, mediaCreator, mediaName, mediaType,
      }, index) => {
        const reviewHeader = `${mediaName} by ${mediaCreator}`;
        const imgSrc = mediaType === 'track' ? track : album;

        return (
          <li className="media mb-5" key={index}>
            <img className="mr-3" src={imgSrc} width="50" height="50" alt="media type icon" />
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
      .catch(() => {
        setErrorMessage('Unable to load reviews.');
      });
  }, []);

  return (
      <div className="p-4 border border-dark rounded">
        <h2 className="mb-4">Recent reviews</h2>
        {errorMessage && <div className="alert alert-danger mb-0">{errorMessage}</div>}
        <ul className="list-unstyled">
          {feed}
        </ul>
      </div>
  );
}

export default Feed;
