import React, {
  useState, useCallback, useEffect, useContext,
} from 'react';
import { contentSchema } from '../schema';
import UserContext from './UserContext';

function ReviewForm({ mediaName, mediaCreator, mediaType }) {
  const { user, setUser } = useContext(UserContext);
  const [content, setContent] = useState();
  const [display, setDisplay] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const reviewHeader = mediaName === ''
    ? `Reviewing ${mediaCreator}`
    : `Reviewing ${mediaName} by ${mediaCreator}`;

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

  useEffect(() => {
    if (content) {
      setDisplay(false);
      setErrorMessage('');

      fetch('http://localhost:3001/api/reviews', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          mediaType,
          mediaName,
          mediaCreator,
          content,
          token: user.token,
        }),
      })
        .then((response) => {
          if (response.ok) {
            setSuccessMessage('Review submitted!');
            setInterval(() => {
              window.location.reload(false);
            }, 1500);
            return;
          }
          throw new Error('Unable to post review.');
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  }, [mediaCreator, mediaName, mediaType, content]);

  return (
    <div className="InputBox col-sm-12 p-4 border border-dark rounded">
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
