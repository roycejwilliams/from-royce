const jwt = require("jsonwebtoken");

// Apple Music API developer token: an ES256 JWT signed with a MusicKit
// private key generated in the Apple Developer portal (requires a paid
// Apple Developer Program membership). Valid for up to 6 months.
// https://developer.apple.com/documentation/applemusicapi/generating-developer-tokens
function getDeveloperToken() {
  const teamId = process.env.APPLE_MUSIC_TEAM_ID;
  const keyId = process.env.APPLE_MUSIC_KEY_ID;
  const privateKey = process.env.APPLE_MUSIC_PRIVATE_KEY;

  if (!teamId || !keyId || !privateKey) {
    throw new Error(
      "Apple Music API is not configured, missing APPLE_MUSIC_TEAM_ID, " +
        "APPLE_MUSIC_KEY_ID, or APPLE_MUSIC_PRIVATE_KEY. Generate a MusicKit " +
        "identifier + private key (.p8) in the Apple Developer portal " +
        "(requires an active Apple Developer Program membership) to enable this."
    );
  }

  return jwt.sign({}, privateKey.replace(/\\n/g, "\n"), {
    algorithm: "ES256",
    expiresIn: "180d",
    issuer: teamId,
    header: { alg: "ES256", kid: keyId },
  });
}

module.exports = { getDeveloperToken };
