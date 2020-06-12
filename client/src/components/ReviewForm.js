import React, { useState, useCallback, useEffect } from 'react';
import { contentSchema } from '../schema';

function ReviewForm({ mediaName, mediaCreator, mediaType }) {
  const [content, setContent] = useState();
  const [display, setDisplay] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const reviewHeader = mediaName === ''
    ? `Reviewing ${mediaCreator}`
    : `Reviewing ${mediaName} by ${mediaCreator}`;

  const handleButtonClick = useCallback((e) => {
    const content = e.target.form.reviewtext.value;
    const { error } = contentSchema.validate(content);

    if (error === undefined) {
      setContent(content);
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
        }),
      });
    }
  }, [mediaCreator, mediaName, mediaType, content]);

  return (
    display && (
      <div className="InputBox col-sm-12 p-4 border border-dark rounded">
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
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
              form="review-form"
              className="btn btn-dark"
              onClick={handleButtonClick}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  );
}

export default ReviewForm;
