import { guardedProcedure, t } from "@server/trpc";
import { addSeconds, isBefore } from "date-fns";

var spotifyToken: string = '';

var cachedData: SpotifyStatus | null = null;
var lastUpdated: any = Date.now(); 

interface SpotifyStatus {
    isPlaying: boolean;
    songName: string;
    songUrl: string;
    artists: FormattedArtist[]; 
    cached: boolean;
}

interface FormattedArtist {
    name: string;
    url: string;
}

interface Artist {
    name: string;
    external_urls: {
        spotify: string;
    }
}

interface SpotifyResponse {
    is_playing: boolean;
    error?: string;
    error_description?: string;
    item: {
        name: string;
        artists: Artist[];
        external_urls: {
            spotify: string;
        }
    }
}

const fetchCurrentlyPlaying = async () => {
    const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
            Authorization: `Bearer ${spotifyToken}`
        }
    });
    return res;
};

const refreshToken = async () => {
    const refreshRes = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
        },
        body: 'grant_type=refresh_token&refresh_token=' + process.env.SPOTIFY_REFRESH_TOKEN
    });
    const refreshData = await refreshRes.json();

    spotifyToken = refreshData.access_token;
}

const returnNothing = () => {
    cachedData = { isPlaying: false, songName: '', artistName: [], artists: [], songUrl: '', cached: false } as SpotifyStatus;
    return cachedData;
}

export const spotifyRouter = t.router({
    getPlayingTrack: guardedProcedure.query(async () => {
        if(isBefore(Date.now(), addSeconds(lastUpdated, 15)) && cachedData !== null) return { ...cachedData, cached: true } as SpotifyStatus;

        // Cache is older than 15 seconds, or doesn't exist -> fetch new data
        if(spotifyToken === '') await refreshToken();

        var res = await fetchCurrentlyPlaying(); 

        if(res.status === 401 || 400){
            await refreshToken();
            // Retry with new token
            res = await fetchCurrentlyPlaying();
        }

        const data = await res.json().catch(() => {
            returnNothing();
        }) as SpotifyResponse;

        if(!data || data.is_playing === false || data.error /* In prod, we'll ignore errors and just say that there isn't any music playing right now */) {
            returnNothing();
        }

        const artists: FormattedArtist[] = [];
        for(const artist of data.item.artists) {
            artists.push({
                name: artist.name,
                url: artist.external_urls.spotify
            });
        }

        const formattedData: SpotifyStatus = {
            isPlaying: data.is_playing,
            songName: data.item.name,
            songUrl: data.item.external_urls.spotify,
            artists: artists,
            cached: false 
        };

        cachedData = formattedData;
        lastUpdated = Date.now();

        return formattedData;
    })
});