import React, { useState, useEffect } from 'react';
import album from '../assets/album.png';
import track from '../assets/track.png';
import loading from '../assets/loading.gif';
import API_URL from '../api_url';

function Feed() {
  const [feed, setFeed] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  // for each review, create an li
  // and set the feed state variable to an array of these li elements
  const createFeed = (reviews) => {
    setFeed(
      reviews.reverse().map(({
        content, created, mediaCreator, mediaName, mediaType, _id,
      }) => {
        const reviewHeader = `${mediaName} by ${mediaCreator}`;
        const imgSrc = mediaType === 'track' ? track : album;

        return (
          <li className="media mb-5" key={_id}>
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

  // GET the music reviews from the server
  useEffect(() => {
    fetch(`${API_URL}/api/reviews`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
      })
      .then((responseJson) => {
        const { reviews } = responseJson;
        createFeed(reviews);
      })
      .catch(() => {
        setErrorMessage('Unable to load reviews. You may be making too many requests.');
      });
  }, []);

  return (
    <div className="p-4 border border-dark rounded">
      <h2 className="mb-4">Recent reviews</h2>
      {errorMessage && <div className="alert alert-danger mb-0">{errorMessage}</div>}
      {!feed && !errorMessage
        && (
        <div>
          <p>Fetching reviews</p>
          <img src={loading} alt="loading gif" />
        </div>
        )}
      {feed
        && (
        <ul className="list-unstyled">
          {feed}
        </ul>
        )}
    </div>
  );
}

export default Feed;
