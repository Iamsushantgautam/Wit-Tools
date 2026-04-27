async function testCobalt() {
    const videoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    try {
        const response = await fetch('https://api.cobalt.tools/api/json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                url: videoUrl,
                videoQuality: '720',
                filenameStyle: 'basic'
            })
        });
        const data = await response.json();
        console.log('Cobalt Response:', data);
    } catch (e) {
        console.error('Cobalt Fetch Failed:', e);
    }
}
testCobalt();
