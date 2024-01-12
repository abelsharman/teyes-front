import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'; //TODO: migrate to tua-body-scroll-lock

function getNode(name) {
  return document.querySelector(`[data-disable-scroll-name='${name}']`);
}

function allowTouchMove(el) {
  while (el && el !== document.body) {
    if (el.classList.contains('body-scroll-lock-ignore')) {
      return true;
    }

    el = el.parentElement;
  }

  return false;
}

export function lockScroll(name) {
  disableBodyScroll(getNode(name), {
    reserveScrollBarGap: true,
    allowTouchMove,
  });
}

export function unlockScroll(name) {
  const node = getNode(name);

  if (node) {
    enableBodyScroll(node);
  } else {
    clearAllBodyScrollLocks();
  }
}
