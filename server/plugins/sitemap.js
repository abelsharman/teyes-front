function generateSitemapString(urlsArray) {
  const urls = urlsArray.map(
    u => `<url><loc>${u.loc}</loc><changefreq>daily</changefreq></url>`,
  );

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.join('')}
    </urlset>
  `;

  return sitemap.trim();
}

export const sitemap = (app, _, done) => {
  app.get('/sitemap.xml', async (req, res) => {
    res.header('Content-Type', 'text/xml');

    const urls = [
      {
        loc: 'https://garagepro.kz/',
      },
      {
        loc: 'https://garagepro.kz/products',
      },
    ];

    // try {
    //   const articles = await req.axios.get('/articles');

    //   const articlesUrlsWithIds = articles.data.content.flatMap(t => [
    //     {
    //       loc: `https://dev.citizensec.kz/step/${t.id}`,
    //     },
    //   ]);

    //   urls.push(...articlesUrlsWithIds);
    // } catch (cause) {
    //   console.log(cause);
    // }

    return generateSitemapString(urls);
  });

  done();
};
