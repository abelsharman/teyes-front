import { createApp } from './app.desktop';

export function render(pageContext: any) {
  createApp(pageContext).mount();
}
