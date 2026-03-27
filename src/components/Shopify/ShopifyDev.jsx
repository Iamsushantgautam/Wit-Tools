import React, { useState } from 'react';
import './ShopifyDev.css';

const ShopifyDev = () => {
    const [toast, setToast] = useState({ show: false, message: '' });

    const prompts = [
        {
            id: 'testimonials-carousel',
            title: 'Testimonials Carousel',
            desc: null,
            prompt: 'Create a testimonials carousel. Each slide should display a customer\'s quote, their name, and a 5-star rating icon. Include navigation arrows and pagination dots at the bottom. The carousel should autoplay and have options to set the autoplay speed and number of testimonials shown.',
            img: null
        },
        {
            id: 'two-column-hero',
            title: 'Two-Column Hero Banner',
            desc: null,
            prompt: 'Create a two-column hero banner. The left column features a large, eye-catching image, and the right column contains a prominent headline, a concise subheadline, and a CTA button. Allow customization of image, text, button text, and button link. Ensure images adapt well on mobile.',
            img: null
        },
        {
            id: 'countdown-timer',
            title: 'Countdown Timer Section',
            desc: null,
            prompt: 'Design a countdown timer block for a flash sale section. The timer should display days, hours, minutes, and seconds, clearly indicating the time remaining until a specified date. Include a message above the timer like "Sale Ends In:" and allow the customization of the date and time.',
            img: null
        },
        {
            id: 'process-block',
            title: 'Process Steps Section',
            desc: null,
            prompt: 'Create a process section with three steps. Each step should include a numerical indicator (1, 2, 3), a bold title for the step, and a short description explaining the process. Use a horizontal layout for desktop and stack vertically on mobile. Easy to customize step titles and descriptions.',
            img: null
        },
        {
            id: 'faq-accordion',
            title: 'FAQ Accordion Section',
            desc: null,
            prompt: 'Build an FAQ section with an accordion layout. Each FAQ item should have a clickable question that expands to reveal the answer. Start with at least three example FAQ items. Ensure the section allows adding or removing FAQ items if needed and modifying questions and answers.',
            img: null
        },
        {
            id: 'why-choose-us',
            title: 'Why Choose Us Section',
            desc: null,
            prompt: 'Develop a "Why Choose Us" section with four distinct benefit cards. Each card should feature a custom icon (allow icon selection or upload), a bold benefit title, and a brief supporting description. Arrange these cards in a two-by-two grid on the desktop and stack vertically on mobile.',
            img: null
        },
        {
            id: 'newsletter-signup',
            title: 'Newsletter Signup Block',
            desc: null,
            prompt: 'Create a newsletter signup block. It includes an enticing headline like "Join Our Community & Get 10% Off Your First Order," a short body text, an email input field, and a "Subscribe" button. Position the input field and button horizontally. Allow customization of the text and button color.',
            img: null
        },
        {
            id: 'info-card',
            title: 'Vertical Info Card',
            desc: null,
            prompt: 'Create a vertical info card block. This card features a small circular image at the top, followed by a bold title, and a descriptive paragraph about a product feature. Include an optional "Learn More" button at the bottom. Allow customization of the image, title, description, and button link.',
            img: null
        },
        {
            id: 'comparison-table',
            title: 'Product Comparison Table',
            desc: null,
            prompt: 'Design a product comparison table. This table allows you to compare two products side-by-side across at least five customizable features. Include a column for features and separate columns for each product to list whether they have that feature (e.g., checkmark/cross icon or "Yes"/"No").',
            img: null
        },
        {
            id: 'featured-collection',
            title: 'Featured Collection Grid',
            desc: null,
            prompt: 'Generate a featured collection grid that displays products from a selected collection. The grid should show three products per row on desktop and one on mobile. Include basic filtering options (e.g., by price range, availability). Each product thumbnail should display the product image, title, and price with easy-to-read content. Enable the selection of the featured collection.',
            img: null
        },
        {
            id: 'hero-banner-advanced',
            title: '2-Column Hero Banner Section (Advanced)',
            desc: null,
            prompt: 'Create a hero banner with a two-column layout. The Left column (1/2 width) has a full-width image that spans edge-to-edge with no padding or margin. The right column (1/2 width) contains a headline, supporting paragraph, and a call-to-action button. The background of this column should use a soft solid color that complements the image. On mobile devices, stack the image on top and the text below.',
            img: null
        },
        {
            id: 'icon-feature-3col',
            title: '3-Column Icon Feature Section',
            desc: null,
            prompt: 'Create a full-width section with three equally spaced vertical columns, each displaying a center-aligned icon, a bold heading, and a short descriptive text beneath. Include vertical dividers between columns. The section should be edge-to-edge with customizable background color and icon upload support.',
            img: null
        },
        {
            id: 'feature-checklist',
            title: 'Product Feature Checklist',
            desc: null,
            prompt: 'Create a small horizontal feature highlight section placed just below the product title. It should have a soft-colored background with rounded corners. Display three feature items in one line with even spacing. Each item should include a green checkmark icon inside a circle and a bold text label.',
            img: null
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
                        {/* <div className="prompt-preview-img">
                            <img src={p.img} alt={p.title} />
                        </div> */}
                        <div className="prompt-card-body">
                            {/* <div className="prompt-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                            </div> */}
                            <div className="prompt-content">
                                <h3>{p.title}</h3>
                                <p className="prompt-desc">{p.desc}</p>
                                <div className="prompt-box" onClick={() => copyToClipboard(p.prompt)}>
                                    {p.prompt}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShopifyDev;
