/** @type {import("next").NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  // ✅ [SEO | STATIC] : mode export statique obligatoire
  output: "export",
  reactStrictMode: true,
  // ✅ [SEO | STATIC] : retire la signature framework
  poweredByHeader: false,
  // ✅ [SEO | STATIC] : URLs cohérentes Apache (index.html dans chaque dossier)
  trailingSlash: true,
  // ✅ [SEO | STATIC] : optimisation images faite en amont
  images: {
    unoptimized: true,
  },
  compress: true,
};

module.exports = withBundleAnalyzer(nextConfig);
