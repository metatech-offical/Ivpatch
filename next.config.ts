import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Treat firebase-admin as a server-only external package so it is never
  // bundled for the Edge Runtime or the client — this prevents build-time
  // crashes when the module references Node-only APIs at import time.
  serverExternalPackages: ["firebase-admin"],
};

export default nextConfig;
