export async function getServerSideProps(pageContext: any) {
  // category_slug
  // product_slug
  const { prefetch, axios, routeParams } = pageContext;
  const { category_slug, product_slug } = routeParams;

  let info = {};
  let isError = false;
  try {
    info = await prefetch(`teyes-product-${product_slug}`, () =>
     axios(`teyes/products/${category_slug}/${product_slug}/`).then((res: any) => res.data),
    );
  } catch (e) {
    isError = true;
  }

  return {
    category_slug,
    product_slug,
    info,
    isError,
  };
}

export function getRawMetaInfo() {
  return {
    title:
      '<title>Главная страница</title>',
    description:
      '<meta name="description" content="Главная страница">',
  };
}
