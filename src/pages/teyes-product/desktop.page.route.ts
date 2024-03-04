import { SsrRoutingLib } from '@shared/lib';
import { resolveRoute } from 'vite-plugin-ssr/routing';

export default SsrRoutingLib.defineDesktopRoute((pageContext: any) => {
  return resolveRoute('/teyes/@category_slug/@product_slug', pageContext.urlPathname);
});
