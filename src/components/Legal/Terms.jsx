import React from 'react';
import './Legal.css';

const Terms = () => {
    const updateDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    return (
        <div className="legal-container">
            <header className="legal-header">
                <h1 className="legal-title">Terms & Service</h1>
                <p className="legal-update">Effective Date: {updateDate}</p>
            </header>

            <div className="legal-content">
                <section>
                    <h2>1. Acceptance of Terms</h2>
                    <p>By using Wit Tools, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service. If you do not agree, please do not use our platform.</p>
                </section>

                <section>
                    <h2>2. Free for Personal Use</h2>
                    <p>Unless otherwise stated, all tools are provided for free for personal and moderate commercial use. We reserve the right to restrict access if we detect abusive automated scraping or non-human interaction that strains our infrastructure.</p>
                </section>

                <section>
                    <h2>3. Data & File Integrity</h2>
                    <p>While we strive for 100% accuracy and high-quality results in our Image and PDF tools, Wit Tools is not liable for data corruption or quality loss during processing. Please always keep original copies of your files.</p>
                </section>

                <section>
                    <h2>4. Liability & Insurance</h2>
                    <p>Wit Tools provides these digital utilities "as is" without warranty of any kind. We are not responsible for any legal or fiscal consequences resulting from the use of tools like Watermark, PDF Password, or Profile Maker.</p>
                </section>

                <section>
                    <h2>5. Modification of Tools</h2>
                    <p>We continuously aim to improve. We reserve the right to modify, suspend, or discontinue any specific tool (e.g., Image Compressor or Background Remover) without prior notice for maintenance or technological upgrades.</p>
                </section>

                <section>
                    <h2>6. Intellectual Property</h2>
                    <p>Wit Tools and its logo are the property of the platform developer. User-uploaded files remain the sole property of the user and are never claimed by us.</p>
                </section>
            </div>
        </div>
    );
};

export default Terms;
