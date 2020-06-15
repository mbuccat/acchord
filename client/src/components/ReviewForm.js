import React, {
  useState, useCallback, useEffect, useContext,
} from 'react';
import { contentSchema } from '../schema';
import UserContext from './UserContext';
import { API_URL } from '../App';

function ReviewForm({ mediaName, mediaCreator, mediaType }) {
  const { user } = useContext(UserContext);
  const [content, setContent] = useState();
  const [display, setDisplay] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const reviewHeader = `Reviewing ${mediaName} by ${mediaCreator}`;

  // store the user's review if it is valid against the content schema,
  // this will trigger useEffect()
  const handleButtonClick = useCallback((e) => {
    e.preventDefault();
    const input = e.target.form.reviewtext.value;
    const { error } = contentSchema.validate(input);

    if (error === undefined) {
      setContent(input);
    } else {
      const message = error.message.includes('1000')
        ? 'Please shorten your review to 1000 characters or less.'
        : 'Please check your review for errors.';
      setErrorMessage(message);
    }
  }, [setContent]);

  // disable posting for deployed app
  // POST the user's review to the server
  // useEffect(() => {
  //   if (content) {
  //     setDisplay(false);
  //     setErrorMessage('');

  //     fetch(`${API_URL}/api/reviews`, {
  //       method: 'POST',
  //       headers: {
  //         'content-type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         mediaType,
  //         mediaName,
  //         mediaCreator,
  //         content,
  //         token: user.token,
  //       }),
  //     })
  //       .then((response) => {
  //         if (response.ok) {
  //           setSuccessMessage('Review submitted!');
  //           setInterval(() => {
  //             window.location.reload(false);
  //           }, 1500);
  //         }
  //       })
  //       .catch((error) => {
  //         const message = error.message.includes('fetch')
  //           ? 'Unable to post review.'
  //           : error.message;
  //         setErrorMessage(message);
  //       });
  //   }
  // }, [mediaCreator, mediaName, mediaType, content, user.token]);

  useEffect(() => {
    if (content) {
      setErrorMessage(
        <p className="mb-0">
          Posting has been disabled! Instead, please see
          {' '}
          <a href="https://github.com/mbuccat/acchord">the code repository</a>
          {' '}
          for a demo.
        </p>,
      );
    }
  }, [content]);

  return (
    <div className="col-sm-12 p-4 border border-dark rounded">
      {successMessage && <div className="alert alert-success mb-0">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger mb-0">{errorMessage}</div>}
      { display && (
        <div className="ReviewForm">
          <h2>
            {reviewHeader}
          </h2>
          <form id="review-form">
            <textarea
              className="form-control mb-1"
              id="reviewtext"
              rows="3"
              placeholder="Your review"
            />
            <button
              type="button"
              className="btn btn-danger mr-1"
              onClick={(e) => {
                e.preventDefault();
                window.location.reload(false);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              form="review-form"
              className="btn btn-dark"
              onClick={handleButtonClick}
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ReviewForm;
