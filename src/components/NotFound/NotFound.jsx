import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <main className="not-found-page">
            <div className="not-found-mark" aria-hidden="true">404</div>
            <div className="not-found-copy">
                <p className="not-found-eyebrow">WIT TOOLS</p>
                <h1>That tool could not be found.</h1>
                <p className="not-found-description">
                    The page may have moved, or the link may be out of date.
                </p>
                <Link className="not-found-button" to="/">
                    Back to home
                </Link>
            </div>
        </main>
    );
};

export default NotFound;
