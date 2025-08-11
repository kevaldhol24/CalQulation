module.exports = {
  siteUrl: 'https://www.calqulation.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  additionalPaths: async () => {
    return [
      {
        loc: '/tool/loan-calculator',
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/tool/sip-calculator',
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
    ];
  },
  // Include all routes, including dynamic ones
  generateIndexSitemap: true,
  excludePages: [], // Don't exclude any pages
};
