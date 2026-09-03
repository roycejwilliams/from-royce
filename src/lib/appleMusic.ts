import { BASE_URL } from "@/lib/api";

// Shapes match the real Apple Music Catalog API "Songs" and "Playlists"
// resources (https://api.music.apple.com/v1/catalog/{storefront}/playlists/{id}?include=tracks)
// so swapping MOCK_PLAYLIST for a live fetchPlaylist() response is a drop-in change.
export type AppleMusicTrack = {
  id: string;
  attributes: {
    name: string;
    artistName: string;
    url: string;
    artwork: { url: string; width: number; height: number };
    previews: { url: string }[];
  };
};

export type AppleMusicPlaylist = {
  id: string;
  attributes: {
    name: string;
    url: string;
    artwork: { url: string; width: number; height: number };
  };
  relationships: {
    tracks: { data: AppleMusicTrack[] };
  };
};

export const PLAYLIST_ID = "pl.u-mJy88R0CzGyjKyd";
const PLAYLIST_URL = "https://music.apple.com/us/playlist/intuition/pl.u-mJy88R0CzGyjKyd";

// PLACEHOLDER DATA. Not a real Apple Music catalog response. Standing in
// until APPLE_MUSIC_TEAM_ID / APPLE_MUSIC_KEY_ID / APPLE_MUSIC_PRIVATE_KEY
// are configured (see functions/src/lib/appleMusicToken.js).
export const MOCK_PLAYLIST: AppleMusicPlaylist = {
  id: PLAYLIST_ID,
  attributes: {
    name: "Intuition",
    url: PLAYLIST_URL,
    artwork: { url: "/images/image5.jpg", width: 1200, height: 1200 },
  },
  relationships: {
    tracks: {
      data: [
        {
          id: "mock-1",
          attributes: {
            name: "So Long",
            artistName: "Allagi",
            url: "https://music.apple.com/us/song/so-long/0000000001",
            artwork: { url: "/images/image5.jpg", width: 1200, height: 1200 },
            previews: [],
          },
        },
        {
          id: "mock-2",
          attributes: {
            name: "Intuition",
            artistName: "From Royce",
            url: "https://music.apple.com/us/song/intuition/0000000002",
            artwork: { url: "/images/image6.jpg", width: 1200, height: 1200 },
            previews: [],
          },
        },
        {
          id: "mock-3",
          attributes: {
            name: "Quiet Signal",
            artistName: "From Royce",
            url: "https://music.apple.com/us/song/quiet-signal/0000000003",
            artwork: { url: "/images/image7.jpg", width: 1200, height: 1200 },
            previews: [],
          },
        },
        {
          id: "mock-4",
          attributes: {
            name: "Northline",
            artistName: "From Royce",
            url: "https://music.apple.com/us/song/northline/0000000004",
            artwork: { url: "/images/image8.jpg", width: 1200, height: 1200 },
            previews: [],
          },
        },
        {
          id: "mock-5",
          attributes: {
            name: "Aperture",
            artistName: "From Royce",
            url: "https://music.apple.com/us/song/aperture/0000000005",
            artwork: { url: "/images/image23.jpg", width: 1200, height: 1200 },
            previews: [],
          },
        },
      ],
    },
  },
};

export async function fetchPlaylist(id: string): Promise<AppleMusicPlaylist> {
  const res = await fetch(`${BASE_URL}/api/apple-music/playlist/${encodeURIComponent(id)}`);
  if (!res.ok) {
    throw new Error(`Apple Music API unavailable (${res.status})`);
  }
  const json = await res.json();
  return json.data[0] as AppleMusicPlaylist;
}
