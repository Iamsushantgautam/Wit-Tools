import React from 'react';
import witpinPreview from '../assets/WitPin-img/witpin.webp';
import './WitPin.css';

const REPO_URL = 'https://github.com/Iamsushantgautam/WitPin--Tab-and-Website-Organizer';
const ZIP_URL = `${REPO_URL}/archive/refs/heads/main.zip`;

const PinMark = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 4.5h8l-1.2 5.1 3.2 3.2v1.1H6v-1.1l3.2-3.2L8 4.5Z" fill="currentColor" />
        <path d="m12 14-.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);

const ArrowIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const DownloadIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 17v3h14v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const features = [
    {
        number: '01',
        title: 'Your favorite sites, one click away',
        text: 'Pin the websites you reach for every day. Switch between a tidy list and a compact grid, then open any site in a new tab.',
        icon: 'pin'
    },
    {
        number: '02',
        title: 'Keep related links together',
        text: 'Make colorful groups for work, research, or whatever is on your mind. Reorder them, add links, and open a whole group at once.',
        icon: 'group'
    },
    {
        number: '03',
        title: 'Pick up right where you left off',
        text: 'Save every tab in your current window as a named workspace. Bring that collection back whenever it is time to focus again.',
        icon: 'layers'
    }
];

const shortcuts = [
    { keys: ['Alt', 'Shift', 'P'], action: 'Open WitPin' },
    { keys: ['Alt', 'Shift', 'S'], action: 'Save the current tab' },
    { keys: ['Alt', 'Shift', 'G'], action: 'Save this window as a workspace' }
];

const WitPin = () => (
    <main className="witpin-page">
        <section className="wp-hero">
            <div className="wp-hero-inner">
                <div className="wp-hero-copy">
                    <a className="wp-back-link" href="/" aria-label="Back to Wit Tools">
                        <span className="wp-back-mark"><PinMark size={15} /></span>
                        A small tool by Wit Tools
                    </a>
                    <div className="wp-kicker"><span /> TAB & WEBSITE ORGANIZER</div>
                    <h1>Keep the good tabs.<br /><em>Lose the clutter.</em></h1>
                    <p className="wp-hero-description">
                        The browser gets busy. WitPin keeps your favorite websites, tab groups, and workspaces close at hand.
                    </p>
                    <div className="wp-hero-actions">
                        <a className="wp-button wp-button-dark" href={ZIP_URL}>
                            <DownloadIcon /> Download for free <ArrowIcon />
                        </a>
                        <a className="wp-source-link" href={REPO_URL} target="_blank" rel="noreferrer">
                            Explore the source <ArrowIcon />
                        </a>
                    </div>
                    <div className="wp-trust-line">
                        <span className="wp-check">✓</span> Free and open source
                        <span className="wp-trust-divider" />
                        <span className="wp-check">✓</span> Your data stays in your browser
                    </div>
                </div>

                <div className="wp-preview-wrap" aria-label="Preview of the WitPin browser extension">
                    <div className="wp-preview-note"><span className="wp-note-dot" /> YOUR BROWSER, A LITTLE TIDIER</div>
                    <img
                        className="wp-preview-image"
                        src={witpinPreview}
                        alt="WitPin extension popup showing grouped websites and pinned links"
                        decoding="async"
                    />
                </div>
            </div>
            <div className="wp-hero-ruler"><span>01 / YOUR BROWSER, ORGANIZED</span><span>SCROLL TO EXPLORE ↓</span></div>
        </section>

        <section className="wp-features" id="features">
            <div className="wp-section-heading">
                <span className="wp-section-label">LESS HUNTING, MORE DOING</span>
                <h2>A home for the tabs<br />you meant to keep.</h2>
                <p>Useful when your browser is doing a little too much.</p>
            </div>
            <div className="wp-feature-list">
                {features.map((feature) => (
                    <article className="wp-feature-row" key={feature.number}>
                        <span className="wp-feature-number">{feature.number}</span>
                        <span className={`wp-feature-symbol wp-symbol-${feature.icon}`} aria-hidden="true">
                            {feature.icon === 'pin' ? <PinMark size={21} /> : feature.icon === 'group' ? '▦' : '▤'}
                        </span>
                        <div><h3>{feature.title}</h3><p>{feature.text}</p></div>
                        <ArrowIcon />
                    </article>
                ))}
            </div>
        </section>

        <section className="wp-shortcuts" id="shortcuts">
            <div className="wp-shortcut-intro">
                <span className="wp-section-label">NO MOUSE REQUIRED</span>
                <h2>Three little<br />shortcuts. Big flow.</h2>
                <p>Save a tab or bring up WitPin without breaking your stride.</p>
            </div>
            <div className="wp-shortcut-list">
                {shortcuts.map((shortcut) => (
                    <div className="wp-shortcut-row" key={shortcut.action}>
                        <span className="wp-shortcut-action">{shortcut.action}</span>
                        <span className="wp-key-group">{shortcut.keys.map((key) => <kbd key={key}>{key}</kbd>)}</span>
                    </div>
                ))}
                <span className="wp-shortcut-footnote">Keyboard shortcuts can be changed in your browser’s extension settings.</span>
            </div>
        </section>

        <section className="wp-install" id="install">
            <div className="wp-install-heading">
                <span className="wp-section-label">UP AND RUNNING IN A MINUTE</span>
                <h2>Make room for<br /><em>better browsing.</em></h2>
            </div>
            <div className="wp-install-content">
                <p>WitPin is a browser extension you install from a downloaded ZIP. No account, build step, or setup wizard.</p>
                <ol className="wp-install-steps">
                    <li><span>01</span><div><strong>Download and unzip</strong><p>Get the WitPin project ZIP and extract it on your computer.</p></div></li>
                    <li><span>02</span><div><strong>Open your extensions page</strong><p>Visit <code>chrome://extensions</code> in Chrome, Edge, Brave, or Vivaldi.</p></div></li>
                    <li><span>03</span><div><strong>Turn on Developer mode</strong><p>Enable the switch near the top of the extensions page.</p></div></li>
                    <li><span>04</span><div><strong>Load the extension</strong><p>Choose “Load unpacked” and select the extracted folder containing <code>manifest.json</code>.</p></div></li>
                </ol>
                <a className="wp-button wp-button-red" href={ZIP_URL}><DownloadIcon /> Download WitPin ZIP <ArrowIcon /></a>
            </div>
        </section>

        <footer className="wp-footer">
            <a className="wp-footer-brand" href="/"><span className="wp-footer-mark"><PinMark size={18} /></span><span>witPin <small>BY WIT TOOLS</small></span></a>
            <span>Keep your favorite corners of the internet close.</span>
            <a className="wp-footer-github" href={REPO_URL} target="_blank" rel="noreferrer">OPEN SOURCE ON GITHUB <ArrowIcon /></a>
        </footer>
    </main>
);

export default WitPin;