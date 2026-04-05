import { useState, useEffect } from 'react';

export type TrackData = {
    isPlaying: boolean;
    name: string;
    artist: string;
    album: string;
    image: string;
    url: string;
} | null;

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
                    setTrack({
                        isPlaying: latest["@attr"]?.nowplaying === "true",
                        name: latest.name,
                        artist: latest.artist["#text"],
                        album: latest.album["#text"],
                        image: latest.image && latest.image[2] ? latest.image[2]["#text"] : "",
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
