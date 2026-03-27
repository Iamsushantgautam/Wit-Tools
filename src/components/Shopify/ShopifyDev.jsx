import React, { useState } from 'react';
import './ShopifyDev.css';

const ShopifyDev = () => {
    const [toast, setToast] = useState({ show: false, message: '' });

    const prompts = [
        {
            id: 'hero',
            title: 'Dynamic Hero Section',
            desc: 'Powerful AI prompt for creating a custom hero section with text alignment, background image video support, and mobile optimization.',
            prompt: 'Create a Shopify Liquid section for a "Dynamic Hero". Requirements: 1. Support for background image/video. 2. Text alignment options (left, center, right). 3. Title, subtitle, and primary/secondary buttons. 4. Mobile responsive layout adjustments. 5. Schema settings for all variables using JSON schema v2.'
        },
        {
            id: 'img-text',
            title: 'Advanced Image with Text',
            desc: 'Optimized section for showcasing features, brand identity, or products with split layout and customizable padding.',
            prompt: 'Act as an expert Shopify developer. Write a custom Liquid section for "Image with Text" with layout options for Image Left or Image Right. Include settings for: background color, text color, image ratio (square, portrait, adapt), and spacing. All should be editable through the Theme Customizer using Liquid and CSS.'
        },
        {
            id: 'grid',
            title: 'Multi-Column Feature Grid',
            desc: 'A flexible grid system for displaying USPs, services, or category links with hover animations.',
            prompt: 'Generate a Shopify Section called "Feature Columns". Features: 1. Adjustable column count (2 to 4). 2. Icon upload support per column. 3. Text and Subtext fields. 4. Border radius and shadow settings from the customizer. 5. Use Vanilla CSS only, avoid external libraries.'
        },
        {
            id: 'faq',
            title: 'Accordion FAQ Section',
            desc: 'Modern FAQ interaction with SEO schema support and smooth opening/closing transitions.',
            prompt: 'Create an accessible FAQ Accordion section for Shopify. Requirements: 1. Clean CSS-only transition for expand/collapse. 2. Support for multiple blocks (Question & Answer). 3. JSON-LD schema automatic generation for Google Rich Results. 4. Color pickers for text and border colors.'
        },
        {
            id: 'testimonial',
            title: 'Premium Testimonial Slider',
            desc: 'Trust-building social proof section with rating stars and reviewer profiles.',
            prompt: 'Design a Shopify Testimonial Slider section. Requirements: 1. Support for 1 to 5 stars. 2. Author image and affiliation fields. 3. Drag-and-drop block support in customizer. 4. Responsive slider behavior (1 per view on mobile, 3 on desktop). 5. Modern subtle shadow and white background styling.'
        },
        {
            id: 'announcement',
            title: 'Multi-Message Bar',
            desc: 'High-converting scrolling bar for the top of the store with promotional timers.',
            prompt: 'Write a Shopify "Multi-Announcement Bar" section. Requirements: 1. Ability to add multiple messages that cycle/carousels. 2. Scroll speed control. 3. Background gradient support. 4. Close button logic. 5. Font size and padding controls in schema.'
        }
    ];

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setToast({ show: true, message: 'Expert prompt copied! Ready for AI.' });
        
        // Auto-hide toast
        setTimeout(() => setToast({ show: false, message: '' }), 3000);
    };

    return (
        <div className="shopify-container">
            {/* Custom Toast Notification */}
            <div className={`custom-toast ${toast.show ? 'show' : ''}`}>
                <div className="toast-content">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
                    <span>{toast.message}</span>
                </div>
            </div>

            <header className="shopify-header">
                <span className="shopify-badge">Shopify Developer Hub</span>
                <h1 className="shopify-title">AI Prompts for <br /> Shopify Section Developers</h1>
                <p className="shopify-subtitle">
                    Accelerate your Shopify development with curated AI prompts designed to generate production-ready Liquid and CSS sections instantly.
                </p>
            </header>

            <div className="prompt-grid">
                {prompts.map(p => (
                    <div key={p.id} className="prompt-card">
                        <div className="prompt-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        </div>
                        <div className="prompt-content">
                            <h3>{p.title}</h3>
                            <p className="prompt-desc">{p.desc}</p>
                            <div className="prompt-box" onClick={() => copyToClipboard(p.prompt)}>
                                {p.prompt.substring(0, 100)}...
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShopifyDev;
