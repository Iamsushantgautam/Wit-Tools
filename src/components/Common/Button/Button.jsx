import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

/**
 * Universal Reusable Button Component for Wit Tools
 * Supports render as <button>, <Link> (react-router), or <a> (external href)
 */
const Button = ({
    children,
    variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
    size = 'md',        // 'sm' | 'md' | 'lg'
    to,
    href,
    icon,
    iconRight,
    fullWidth = false,
    className = '',
    disabled = false,
    type = 'button',
    onClick,
    target,
    rel,
    ...props
}) => {
    const classNames = [
        'wit-btn',
        `wit-btn-${variant}`,
        `wit-btn-${size}`,
        fullWidth ? 'wit-btn-full' : '',
        disabled ? 'wit-btn-disabled' : '',
        className
    ].filter(Boolean).join(' ');

    const content = (
        <>
            {icon && <span className="wit-btn-icon wit-btn-icon-left">{icon}</span>}
            <span className="wit-btn-label">{children}</span>
            {iconRight && <span className="wit-btn-icon wit-btn-icon-right">{iconRight}</span>}
        </>
    );

    if (to && !disabled) {
        return (
            <Link to={to} className={classNames} onClick={onClick} {...props}>
                {content}
            </Link>
        );
    }

    if (href && !disabled) {
        return (
            <a
                href={href}
                className={classNames}
                target={target || (href.startsWith('http') ? '_blank' : undefined)}
                rel={rel || (href.startsWith('http') ? 'noopener noreferrer' : undefined)}
                onClick={onClick}
                {...props}
            >
                {content}
            </a>
        );
    }

    return (
        <button
            type={type}
            className={classNames}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {content}
        </button>
    );
};

export default Button;
