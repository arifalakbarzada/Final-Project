import React from 'react';
import { FiFrown } from 'react-icons/fi';

function NotFoundForUserPage({ title, message }) {
    return (
        <div className="not-found">
            <FiFrown className="not-found-icon" />
            <h2>{title}</h2>
            <p>{message}</p>
            <button onClick={() => window.history.back()} className="back-btn">
                Go Back
            </button>
        </div>
    );
}

export default NotFoundForUserPage;
