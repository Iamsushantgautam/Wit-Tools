async function testPiped() {
    const videoId = 'dQw4w9WgXcQ'; // Rick Astley
    try {
        const response = await fetch(`https://pipedapi.kavin.rocks/streams/${videoId}`);
        const data = await response.json();
        console.log('Piped Data:', data);
        if (data.videoStreams) {
            console.log('First Stream URL:', data.videoStreams[0].url);
        }
    } catch (e) {
        console.error('Piped Fetch Failed:', e);
    }
}
testPiped();
