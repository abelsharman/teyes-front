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
}

export function getRawMetaInfo(props: any) {
  return {
    title:
      `<title>${props.info.name}</title>`,
    description:
      `<meta name="description" content="${props.info.name}">`,
  };
}
