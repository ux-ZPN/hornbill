import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__bg" />
      <div className="not-found__content">
        <h1 className="not-found__title">404</h1>
        <div className="not-found__divider" />
        <h2 className="not-found__subtitle">Lost in the Hills</h2>
        <p className="not-found__text">
          The path you're looking for doesn't exist in Kisama Heritage Village. 
          Return to the festival grounds.
        </p>
        <Link to="/" className="btn-solid">Back to Festival</Link>
      </div>
    </div>
  );
}
