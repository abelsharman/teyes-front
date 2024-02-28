import { createApp } from './app.mobile';

export function render(pageContext: any) {
  createApp(pageContext).mount();
}
