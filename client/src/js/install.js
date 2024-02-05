let deferredPrompt;

const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // Check if deferredPrompt is defined
    if (deferredPrompt) {
        // Prompt the user to install the app
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }

        // Reset deferredPrompt and hide install button
        deferredPrompt = null;
        butInstall.style.display = 'none';
    }
});

// Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('J.A.T.E. was installed successfully.');
});