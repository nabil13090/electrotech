/** @type {import(''next-sitemap'').IConfig} */
module.exports = {
  // ✅ [SEO | STATIC] : domaine canonique du site
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://electrotech-sud.fr",
  // ✅ [SEO | STATIC] : génération sitemap/robots dans /out
  outDir: "out",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  trailingSlash: true,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/404", "/500"],
  transform: async (config, path) => {
    if (path === "/") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: ["AhrefsBot", "SemrushBot", "DotBot", "MJ12bot", "PetalBot"],
        disallow: ["/"],
      },
    ],
  },
};
