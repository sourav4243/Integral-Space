import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const track = searchParams.get('track');
    const artist = searchParams.get('artist');

    if (!track || !artist) {
        return NextResponse.json({ error: 'Missing track or artist' }, { status: 400 });
    }

    // Try iTunes Search API first — great coverage for Hindi/Bollywood songs
    try {
        const query = encodeURIComponent(`${track} ${artist}`);
        const itunesRes = await fetch(
            `https://itunes.apple.com/search?term=${query}&media=music&entity=song&limit=5`,
            { next: { revalidate: 3600 } } // cache for 1 hour
        );

        if (itunesRes.ok) {
            const itunesData = await itunesRes.json();
            if (itunesData.resultCount > 0) {
                // Pick the best match — prefer exact artist name match
                const results = itunesData.results as Array<{
                    artworkUrl100: string;
                    artistName: string;
                    trackName: string;
                }>;

                const artistLower = artist.toLowerCase();
                const trackLower = track.toLowerCase();

                const bestMatch =
                    results.find(
                        (r) =>
                            r.artistName.toLowerCase().includes(artistLower) ||
                            artistLower.includes(r.artistName.toLowerCase())
                    ) ||
                    results.find(
                        (r) =>
                            r.trackName.toLowerCase().includes(trackLower) ||
                            trackLower.includes(r.trackName.toLowerCase())
                    ) ||
                    results[0];

                if (bestMatch?.artworkUrl100) {
                    // Upscale to 600x600 from default 100x100
                    const highRes = bestMatch.artworkUrl100.replace('100x100bb', '600x600bb');
                    return NextResponse.json({ image: highRes, source: 'itunes' });
                }
            }
        }
    } catch (err) {
        console.error('iTunes lookup failed:', err);
    }

    // If iTunes also fails, return empty so the UI shows the fallback art
    return NextResponse.json({ image: '', source: 'none' });
}
