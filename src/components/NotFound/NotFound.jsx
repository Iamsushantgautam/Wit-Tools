import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    const style = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '70vh',
            textAlign: 'center',
            fontFamily: 'Outfit, sans-serif'
        },
        title: {
            fontSize: '6rem',
            margin: '0',
            background: 'linear-gradient(to right, #4f46e5, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '800'
        },
        subtitle: {
            fontSize: '1.5rem',
            color: '#475569',
            marginBottom: '2rem'
        },
        button: {
            padding: '0.75rem 2rem',
            background: '#4f46e5',
            color: 'white',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'all 0.2s ease'
        }
    };

    return (
        <div style={style.container}>
            <h1 style={style.title}>404</h1>
            <p style={style.subtitle}>Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" style={style.button}>Back to Home</Link>
        </div>
    );
};

export default NotFound;
