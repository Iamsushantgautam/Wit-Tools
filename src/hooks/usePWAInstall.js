import { useState, useEffect } from 'react';

/**
 * usePWAInstall — captures the browser's install prompt and exposes:
 *   canInstall  → boolean: true when the install button should be shown
 *   installApp  → function: triggers the native install dialog
 */
const usePWAInstall = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [canInstall, setCanInstall] = useState(false);

    useEffect(() => {
        // Already installed (running as standalone PWA)
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setCanInstall(false);
            return;
        }

        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault(); // Prevent auto-prompt
            setDeferredPrompt(e);
            setCanInstall(true);
        };

        const handleAppInstalled = () => {
            setCanInstall(false);
            setDeferredPrompt(null);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const installApp = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setCanInstall(false);
            setDeferredPrompt(null);
        }
    };

    return { canInstall, installApp };
};

export default usePWAInstall;
