import React from 'react';
import './Legal.css';

const PrivacyPolicy = () => {
    const updateDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    return (
        <div className="legal-container">
            <header className="legal-header">
                <h1 className="legal-title">Privacy Policy</h1>
                <p className="legal-update">Last Updated: {updateDate}</p>
            </header>

            <div className="legal-content">
                <section>
                    <h2>1. User Privacy First</h2>
                    <p>At Wit Tools, your privacy is our supreme priority. Unlike many other online services, we believe in a "zero-data-retention" philosophy. Most of our tools operate entirely within your browser or process files in secure, temporary storage that is purged immediately after processing.</p>
                </section>

                <section>
                    <h2>2. Information Collection</h2>
                    <p>We do not require user accounts to use our core tools. We do not collect personally identifiable information (PII) unless you explicitly provide it (e.g., via the contact form or feedback section).</p>
                    <p>Standard anonymous analytics data (like browser type, device type, and page views) may be collected to help us improve the platform experience.</p>
                </section>

                <section>
                    <h2>3. Data Handling & Files</h2>
                    <p>When you upload a file (PDF or Image) to our tools:</p>
                    <ul>
                        <li>Local Processing: Many tools process data directly in your browser using JavaScript, meaning your files never even leave your device.</li>
                        <li>Temporary Servers: If a tool requires server-side processing, files are transmitted via encrypted connection (HTTPS) and automatically deleted from our servers the moment your download is complete.</li>
                    </ul>
                </section>

                <section>
                    <h2>4. Cookies</h2>
                    <p>We use essential cookies to maintain your session preferences and provide basic site functionality. We do not use tracking cookies for third-party advertising.</p>
                </section>

                <section>
                    <h2>5. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please reach out via our contact page.</p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
