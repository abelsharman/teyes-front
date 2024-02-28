import { env } from '../config';

export function withoutDuplicatedSlash(url: string) {
  return url.replace(/:(\/\/+)|\/\/+/g, function (_, afterProtocol) {
    return afterProtocol ? `:${afterProtocol}` : '/';
  });
}

export function createUrlFromPath({ path }: { path: string }) {
  const { origin, pathname } = new URL(
    env.IS_DEV_RUNTIME ? 'http://localhost:8000/' : env.BASE_URL,
  );

  return withoutDuplicatedSlash(`${origin}/${pathname}/${path}`);
}

function openLink({
  link,
  target = '_self',
}: {
  link: string;
  target?: string;
}) {
  window.open(link, target, 'noopener noreferrer');
}

function replaceLink({ link }: { link: string }) {
  window.location.replace(link);
}

export const NavigationLib = {
  openLink,
  replaceLink,
  createUrlFromPath,
  withoutDuplicatedSlash,
  mainPage: () => createUrlFromPath({ path: '/' }),
};
