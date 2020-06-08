import React, { useState, useCallback, useEffect } from 'react';

function ReviewForm({ mediaName, mediaCreator, mediaType }) {
  const [content, setContent] = useState();
  const [display, setDisplay] = useState(true);
  const reviewHeader = mediaName === ''
    ? `Reviewing ${mediaCreator}`
    : `Reviewing ${mediaName} by ${mediaCreator}`;

  const handleButtonClick = useCallback((e) => {
    setContent(e.target.form.reviewtext.value);
  }, [setContent]);

  useEffect(() => {
    if (content) {
      setDisplay(false);

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
