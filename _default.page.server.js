import { isFunction } from 'lodash-es';
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server';
import { renderToString } from '@vue/server-renderer';

export const passToClient = [
  'pageProps',
  'urlPathname',
  'isMobile',
];

async function renderApp(pageContext) {
  const { createApp } = pageContext.exports;

  if (!isFunction(createApp)) {
    return '<div id="app"></div>';
  }

  const app = await createApp(pageContext).isReady();

  return renderToString(app, {
    cache: pageContext.ssrPrefetchCache,
  });
}

export async function onBeforeRender(pageContext) {
  const { getServerSideProps } = pageContext.exports;

  const pageProps = isFunction(getServerSideProps)
    ? await getServerSideProps(pageContext)
    : {};

  return {
    pageContext: {
      isMobile: pageContext.useragent.isMobile,
      pageProps,
    },
  };
}

export async function render(pageContext) {
  const rawMetaInfo = pageContext.exports?.getRawMetaInfo();

  const appHtml = await renderApp(pageContext);

  const html = escapeInject`<!DOCTYPE html>
    <html lang="ru">
    <head>
     <meta charset="UTF-8">
      <link rel="icon" href="/favicon.ico">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="google-site-verification" content="T9vQmvrpGhk14UUVzsHfSuGPZZhAfzQkr_JYaGnw8Kw" />
      ${dangerouslySkipEscape(rawMetaInfo?.robots ?? '')}
      ${dangerouslySkipEscape(rawMetaInfo?.description)}
      ${dangerouslySkipEscape(rawMetaInfo?.title)}
    </head>
    <body>
        ${dangerouslySkipEscape(appHtml)}
    </body>
  </html>`;

  return {
    documentHtml: html,
  };
}
