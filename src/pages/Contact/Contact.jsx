import React, { useState } from 'react';
import Button from '../../components/Common/Button/Button';
import CustomSelect from '../../components/Common/CustomSelect/CustomSelect';
import './Contact.css';

const SUBJECT_OPTIONS = [
    { value: 'General Inquiry', label: 'General Inquiry' },
    { value: 'Bug Report', label: 'Bug Report' },
    { value: 'Feature Request', label: 'Feature Request' },
    { value: 'Other', label: 'Other' }
];

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
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
                    subject: `[Wit Tools Contact] ${formData.subject}`,
                    message: formData.message,
                    from_name: 'Wit Tools Web App'
                }),
            });

            const data = await response.json();

            if (data.success) {
                setStatus({ type: 'success', msg: '✅ Thank you! Your message has been sent successfully. We\'ll get back to you soon.' });
                setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
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
                <h1 className="contact-title">Contact</h1>
                <p className="contact-subtitle">
                    Contact us to report a problem, clarify any doubts about Wit Tools, or just find out more.
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

                    <div className="form-group" style={{ marginTop: '1.25rem' }}>
                        <label className="control-label">General Subject*</label>
                        <CustomSelect
                            name="subject"
                            value={formData.subject}
                            options={SUBJECT_OPTIONS}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group" style={{ marginTop: '1.25rem' }}>
                        <label className="control-label">Message / Details*</label>
                        <textarea
                            className="input-field"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Describe your request..."
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
                            {loading ? 'Sending...' : 'Send Message'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
