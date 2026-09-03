// The Cylburn script font's wide, swash-heavy letters (currently just "W")
// carry so much built-in right-side bearing that pairing them with a
// plain-text suffix (the "ork" in "Work") leaves an oversized visual gap
// at large display sizes. Pull the suffix in with a proportional negative
// margin so the pairing reads as one word instead of two.
const WIDE_DROP_CAPS = new Set(["W", "w"]);

export function dropCapTightening(letter: string): string {
  return WIDE_DROP_CAPS.has(letter) ? "-mr-[0.15em]" : "";
}
