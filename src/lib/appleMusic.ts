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

export async function fetchPlaylist(id: string): Promise<{ playlist: AppleMusicPlaylist; snapshot: boolean }> {
  const res = await fetch(`${BASE_URL}/api/apple-music/playlist/${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error(`Apple Music playlist unavailable (${res.status})`);
  return await res.json();
}
