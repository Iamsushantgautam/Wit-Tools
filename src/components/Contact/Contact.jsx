import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [loading, setLoading] = useState(false);

    // YOU WILL NEED TO REPLACE THIS WITH YOUR ACTUAL FORMSPREE ID
    const FORM_ID = "xpzeqeqp"; // User can replace this later

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', msg: '' });

        try {
            const response = await axios.post(`https://formspree.io/f/${FORM_ID}`, formData);
            if (response.status === 200) {
                setStatus({ type: 'success', msg: 'Thank you! Your message has been sent successfully.' });
                setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
            }
        } catch (error) {
            setStatus({ type: 'error', msg: 'Oops! Something went wrong. Please try again later.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tool-container contact-container">
            <div className="tool-header-card">
                <h2>Contact & Feedback</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>We'd love to hear from you!</p>
            </div>

            <div className="tool-card contact-card">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="control-label">Full Name</label>
                            <input
                                type="text"
                                className="input-field"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Email Address</label>
                            <input
                                type="email"
                                className="input-field"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your email"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginTop: '1.25rem' }}>
                        <label className="control-label">Subject / Topic</label>
                        <select
                            className="input-field"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                        >
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Bug Report">Bug Report</option>
                            <option value="Feature Request">Feature Request</option>
                            <option value="Feedback">Positive Feedback</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group" style={{ marginTop: '1.25rem' }}>
                        <label className="control-label">Message / Feedback Details</label>
                        <textarea
                            className="input-field"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us what you think..."
                            style={{ minHeight: '150px', resize: 'vertical' }}
                            required
                        ></textarea>
                    </div>

                    {status.msg && (
                        <div className={`status-banner ${status.type}`}>
                            {status.msg}
                        </div>
                    )}

                    <div className="form-actions" style={{ marginTop: '2rem' }}>
                        <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                </form>

                <div className="contact-info">
                    <p>Alternatively, you can reach out directly via GitHub.</p>
                    <a href="https://github.com/Iamsushantgautam" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ width: '100%', textAlign: 'center', marginTop: '0.5rem' }}>
                        View Developer Profile
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Contact;
