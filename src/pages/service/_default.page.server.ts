export async function getServerSideProps(pageContext: any) {
  // category_slug
  // product_slug
  const { prefetch, axios, routeParams } = pageContext;
  const { slug } = routeParams;

  let info = {};
  let isError = false;
  try {
    info = await prefetch(`service-${slug}`, () =>
     axios(`services/${slug}/`).then((res: any) => res.data),
    );
  } catch (e) {
    isError = true;
  }

  return {
    slug,
    info,
    isError,
  };

  return Promise.resolve();
}

export function getRawMetaInfo() {
  return {
    title:
      '<title>Главная страница</title>',
    description:
      '<meta name="description" content="Главная страница">',
  };
}
