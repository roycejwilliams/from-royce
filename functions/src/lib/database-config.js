function databaseConfig(connectionString, production) {
  if (!production) return { connectionString, ssl: false, max: 3, idleTimeoutMillis: 30000 };
  if (!connectionString) throw new Error("Production database configuration is missing");
  let url;
  try { url = new URL(connectionString); } catch { throw new Error("Production database configuration is invalid"); }
  if (!["postgres:", "postgresql:"].includes(url.protocol) || !url.hostname) {
    throw new Error("Production database configuration is invalid");
  }
  // pg connection-string SSL parameters replace the explicit ssl object.
  // Reject unsafe/custom certificate modes instead of quietly weakening them.
  const mode = url.searchParams.get("sslmode");
  const flag = url.searchParams.get("ssl");
  if ((mode && !["require", "verify-ca", "verify-full"].includes(mode)) ||
      (flag && !["true", "1"].includes(flag)) ||
      ["sslcert", "sslkey", "sslrootcert", "uselibpqcompat"].some(key => url.searchParams.has(key))) {
    throw new Error("Production database TLS configuration requires review");
  }
  url.searchParams.delete("sslmode");
  url.searchParams.delete("ssl");
  return {
    connectionString: url.toString(),
    ssl: { rejectUnauthorized: true },
    max: 3,
    idleTimeoutMillis: 30000,
  };
}
module.exports = { databaseConfig };
