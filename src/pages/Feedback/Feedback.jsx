import React, { useState } from 'react';
import Button from '../../components/Common/Button/Button';
import CustomSelect from '../../components/Common/CustomSelect/CustomSelect';
import '../Contact/Contact.css';

const TYPE_OPTIONS = [
    { value: 'General Feedback', label: 'General Feedback' },
    { value: 'Feature Request', label: 'Feature Request' },
    { value: 'Bug Report', label: 'Bug Report' },
    { value: 'Praise', label: 'Praise & Appreciations' }
];

const RATING_OPTIONS = [
    { value: '5', label: '5 Stars — Excellent' },
    { value: '4', label: '4 Stars — Good' },
    { value: '3', label: '3 Stars — Average' },
    { value: '2', label: '2 Stars — Needs Work' },
    { value: '1', label: '1 Star — Poor' }
];

const Feedback = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: 'General Feedback',
        rating: '5',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [loading, setLoading] = useState(false);

    const WEB3FORMS_ACCESS_KEY = '160d0817-725f-43a4-96ec-ac938f3a477c';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', msg: '' });

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    name: formData.name,
                    email: formData.email,
                    subject: `[Wit Tools Feedback] ${formData.type} (Rating: ${formData.rating}/5)`,
                    message: formData.message,
                    from_name: 'Wit Tools Web App'
                }),
            });

            const data = await response.json();

            if (data.success) {
                setStatus({ type: 'success', msg: '❤️ Thank you for your feedback! We appreciate your input to make Wit Tools better.' });
                setFormData({ name: '', email: '', type: 'General Feedback', rating: '5', message: '' });
            } else {
                setStatus({ type: 'error', msg: data.message || 'Submission failed. Please try again.' });
            }
        } catch (error) {
            console.error('Web3Forms submit error:', error);
            setStatus({ type: 'error', msg: 'Network error — please check your internet connection and try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-page-container">
            <div className="contact-hero-left">
                <h1 className="contact-title">Feedback</h1>
                <p className="contact-subtitle">
                    We value your thoughts! Share your experience, suggest new features, or report issues to help us continuously improve Wit Tools.
                </p>
            </div>

            <div className="contact-card-right">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-grid-2">
                        <div className="form-group">
                            <label className="control-label">Your name*</label>
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
                            <label className="control-label">Your email*</label>
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

                    <div className="form-grid-2" style={{ marginTop: '1.25rem' }}>
                        <div className="form-group">
                            <label className="control-label">Feedback Type*</label>
                            <CustomSelect
                                name="type"
                                value={formData.type}
                                options={TYPE_OPTIONS}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Overall Rating*</label>
                            <CustomSelect
                                name="rating"
                                value={formData.rating}
                                options={RATING_OPTIONS}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginTop: '1.25rem' }}>
                        <label className="control-label">Feedback Details*</label>
                        <textarea
                            className="input-field"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us what you think or what we should build next..."
                            style={{ height: '120px', resize: 'none' }}
                            required
                        ></textarea>
                    </div>

                    {status.msg && (
                        <div className={`status-banner ${status.type}`}>
                            {status.msg}
                        </div>
                    )}

                    <div className="form-submit-row">
                        <Button type="submit" variant="primary" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit Feedback'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Feedback;
