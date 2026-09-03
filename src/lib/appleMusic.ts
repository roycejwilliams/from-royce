import { BASE_URL } from "@/lib/api";

// Shape matches the real Apple Music Catalog API "Songs" resource
// (https://api.music.apple.com/v1/catalog/{storefront}/songs) so swapping
// MOCK_TRACKS for a live fetchTracks() response is a drop-in change.
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

// PLACEHOLDER DATA — not real Apple Music catalog responses. Standing in
// until APPLE_MUSIC_TEAM_ID / APPLE_MUSIC_KEY_ID / APPLE_MUSIC_PRIVATE_KEY
// are configured (see functions/src/lib/appleMusicToken.js).
export const MOCK_TRACKS: AppleMusicTrack[] = [
  {
    id: "mock-1",
    attributes: {
      name: "So Long",
      artistName: "Allagi",
      url: "https://music.apple.com/us/album/so-long/0000000001",
      artwork: {
        url: "/images/image5.jpg",
        width: 1200,
        height: 1200,
      },
      previews: [],
    },
  },
  {
    id: "mock-2",
    attributes: {
      name: "Intuition",
      artistName: "From Royce",
      url: "https://music.apple.com/us/album/intuition/0000000002",
      artwork: {
        url: "/images/image6.jpg",
        width: 1200,
        height: 1200,
      },
      previews: [],
    },
  },
  {
    id: "mock-3",
    attributes: {
      name: "Quiet Signal",
      artistName: "From Royce",
      url: "https://music.apple.com/us/album/quiet-signal/0000000003",
      artwork: {
        url: "/images/image7.jpg",
        width: 1200,
        height: 1200,
      },
      previews: [],
    },
  },
  {
    id: "mock-4",
    attributes: {
      name: "Northline",
      artistName: "From Royce",
      url: "https://music.apple.com/us/album/northline/0000000004",
      artwork: {
        url: "/images/image8.jpg",
        width: 1200,
        height: 1200,
      },
      previews: [],
    },
  },
];

export async function fetchTracks(ids: string[]): Promise<AppleMusicTrack[]> {
  const res = await fetch(
    `${BASE_URL}/api/apple-music/tracks?ids=${encodeURIComponent(ids.join(","))}`
  );
  if (!res.ok) {
    throw new Error(`Apple Music API unavailable (${res.status})`);
  }
  const json = await res.json();
  return json.data as AppleMusicTrack[];
}
