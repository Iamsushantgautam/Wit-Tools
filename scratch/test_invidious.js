async function testInvidious() {
    const videoId = 'dQw4w9WgXcQ';
    const instances = [
        'https://invidious.snopyta.org',
        'https://yewtu.be',
        'https://invidious.kavin.rocks'
    ];
    
    for (const instance of instances) {
        try {
            console.log(`Testing ${instance}...`);
            const response = await fetch(`${instance}/api/v1/videos/${videoId}`);
            if (response.ok) {
                const data = await response.json();
                console.log(`Success with ${instance}:`, data.title);
                if (data.formatStreams) {
                    console.log('Available Streams:', data.formatStreams.length);
                }
                break;
            }
        } catch (e) {
            console.error(`Failed ${instance}:`, e.message);
        }
    }
}
testInvidious();
