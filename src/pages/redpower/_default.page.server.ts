//TODO: add pageContext type
export function getServerSideProps(pageContext: any) {
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
