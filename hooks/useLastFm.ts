import { useState, useEffect } from 'react';

export type TrackData = {
    isPlaying: boolean;
    name: string;
    artist: string;
    album: string;
    image: string;
    url: string;
} | null;

/**
 * Fetches album artwork from our server-side /api/artwork route.
 * The route tries iTunes Search API which has great coverage for
 * Hindi / Bollywood songs that Last.fm often lacks art for.
 */
async function fetchFallbackArtwork(track: string, artist: string): Promise<string> {
    try {
        const params = new URLSearchParams({ track, artist });
        const res = await fetch(`/api/artwork?${params}`);
        if (!res.ok) return '';
        const data = await res.json();
        return data.image ?? '';
    } catch {
        return '';
    }
}

export const useLastFm = () => {
    const [track, setTrack] = useState<TrackData>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMusic = async () => {
            try {
                const API_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY || "API_KEY";
                const USERNAME = process.env.NEXT_PUBLIC_LASTFM_USERNAME || "sourav4243";

                if (API_KEY === "API_KEY") {
                    console.warn("Last.fm API Key missing");
                    setLoading(false);
                    return;
                }

                const res = await fetch(
                    `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`
                );
                
                if (!res.ok) {
                    throw new Error("Failed to fetch track from Last.fm");
                }
                
                const data = await res.json();
                
                if (data.recenttracks?.track && data.recenttracks.track.length > 0) {
                    const latest = data.recenttracks.track[0];
                    const name: string = latest.name;
                    const artist: string = latest.artist["#text"];
                    const album: string = latest.album["#text"];

                    // Last.fm image — often missing for Hindi songs
                    let image: string = latest.image && latest.image[2] ? latest.image[2]["#text"] : "";

                    // If Last.fm gave us nothing (or the known placeholder), fetch from iTunes
                    const isBlankImage =
                        !image ||
                        image.includes('2a96cbd8b46e442fc41c2b86b821562f') || // Last.fm's generic placeholder hash
                        image.trim() === '';

                    if (isBlankImage) {
                        image = await fetchFallbackArtwork(name, artist);
                    }

                    setTrack({
                        isPlaying: latest["@attr"]?.nowplaying === "true",
                        name,
                        artist,
                        album,
                        image,
                        url: latest.url,
                    });
                }
            } catch (error) {
                console.error("Error fetching music:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMusic();
        const interval = setInterval(fetchMusic, 10000); // Poll every 10s
        return () => clearInterval(interval);
    }, []);

    return { track, loading };
};
