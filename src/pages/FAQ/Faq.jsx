import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ToolHeader from '../../components/ToolHeader/ToolHeader';
import Button from '../../components/Common/Button/Button';
import './Faq.css';

const FAQ_DATA = [
    {
        category: 'General & Platform',
        items: [
            {
                q: 'Is Wit Tools completely free to use?',
                a: 'Yes, 100% free! All tools—including PDF compression, background removal, image conversion, and code generators—are available with zero subscription fees, signups, or hidden limits.'
            },
            {
                q: 'Do I need to create an account or sign up?',
                a: 'No. You can access and use every single tool instantly without creating an account or providing an email address.'
            },
            {
                q: 'Can I install Wit Tools as an app on desktop or mobile?',
                a: 'Yes! Wit Tools is built as a progressive web application (PWA). Click the "Install App" or "Add to Home Screen" option in your browser to use Wit Tools like a native desktop or mobile app.'
            }
        ]
    },
    {
        category: 'Privacy & Security',
        items: [
            {
                q: 'Are my uploaded files and documents safe?',
                a: 'Extremely safe. Wit Tools uses a zero-data-retention, client-side architecture. Most tools process your files directly inside your web browser’s local memory—meaning your sensitive PDFs and images never leave your device.'
            },
            {
                q: 'Does Wit Tools store or sell my personal data?',
                a: 'Never. We do not store, log, or sell any personal data, uploaded documents, or generated assets.'
            }
        ]
    },
    {
        category: 'PDF & Image Tools',
        items: [
            {
                q: 'Is there a limit on file sizes or daily usage?',
                a: 'No artificial daily caps! You can convert and compress as many files as you need. Since processing runs in your browser, speed depends on your device memory.'
            },
            {
                q: 'What image formats are supported for conversion?',
                a: 'We support PNG, JPG, WebP, GIF, SVG, and PDF conversions in both directions with high fidelity.'
            },
            {
                q: 'Can I use generated QR codes for commercial projects?',
                a: 'Yes! All QR codes and SVG graphics created on Wit Tools are 100% free for personal and commercial usage without attribution.'
            }
        ]
    },
    {
        category: 'Developer & Shopify Tools',
        items: [
            {
                q: 'How do the Shopify Liquid and developer generators work?',
                a: 'Our developer tools compile clean, production-ready code snippets and Liquid templates directly in real time. Simply customize your parameters and click to copy.'
            },
            {
                q: 'How can I report a bug or request a new tool?',
                a: 'We love community input! You can submit tool requests or bug reports directly via our Contact or Feedback page.'
            }
        ]
    }
];

const Faq = () => {
    const [search, setSearch] = useState('');
    const [openIdx, setOpenIdx] = useState('0-0');

    const toggleFaq = (idx) => {
        setOpenIdx(openIdx === idx ? null : idx);
    };

    return (
        <div className="faq-page-wrapper">
            <ToolHeader
                title="Frequently Asked Questions"
                subtitle="Everything you need to know about Wit Tools, privacy, and performance"
            />

            <div className="faq-search-box">
                <svg className="faq-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input
                    type="text"
                    className="faq-search-input"
                    placeholder="Search questions or keywords..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="faq-card">
                <div className="faq-content">
                    {FAQ_DATA.map((cat, catIdx) => {
                        const filteredItems = cat.items.filter(
                            item => item.q.toLowerCase().includes(search.toLowerCase()) ||
                                    item.a.toLowerCase().includes(search.toLowerCase())
                        );

                        if (search && filteredItems.length === 0) return null;

                        return (
                            <section key={catIdx} className="faq-section">
                                <h2 className="faq-cat-title">{cat.category}</h2>
                                <div className="faq-accordion-group">
                                    {filteredItems.map((item, itemIdx) => {
                                        const uniqueKey = `${catIdx}-${itemIdx}`;
                                        const isOpen = openIdx === uniqueKey;

                                        return (
                                            <div key={itemIdx} className={`faq-item ${isOpen ? 'active' : ''}`}>
                                                <button className="faq-question-btn" onClick={() => toggleFaq(uniqueKey)}>
                                                    <span>{item.q}</span>
                                                    <svg className="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M6 9l6 6 6-6" />
                                                    </svg>
                                                </button>
                                                {isOpen && (
                                                    <div className="faq-answer-box">
                                                        <p>{item.a}</p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        );
                    })}
                </div>

                <div className="faq-contact-cta">
                    <h3>Still have questions?</h3>
                    <p>Can't find the answer you're looking for? Reach out to our team directly.</p>
                    <Link to="/contact" style={{ textDecoration: 'none' }}>
                        <Button variant="primary">
                            Contact Support
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Faq;
