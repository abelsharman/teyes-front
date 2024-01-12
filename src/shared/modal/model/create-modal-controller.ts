import { ref, nextTick } from 'vue';
import { find, filter, some, get, isEmpty } from 'lodash';

import { lockScroll, unlockScroll } from './scroll-lock';


export const ModalControllerKey =
  Symbol('MODAL_SYMBOL');

export function createModalController() {
  const modalStack = ref([]);

  function escapeHandler(e) {
    return e.code === 'Escape' && hideLast();
  }

  function isVisible(name: string) {
    return some(modalStack.value, modal => modal.activeName === name);
  }

  function show(
    name: string,
    {
      captureEscape = true,
      captureBackButton = true,
      params = {},
    }: ShowOption = {},
  ) {
    if (isVisible(name)) {
      return;
    }

    modalStack.value.push({
      activeName: name,
      params,
    });

    nextTick().then(() => lockScroll(name));

    if (captureEscape) {
      document.addEventListener('keydown', escapeHandler);
    }

    if (captureBackButton) {
      document.addEventListener('backbutton', hideLast);
    }
  }

  function getParams(name: string) {
    const currentModal = find(modalStack.value, ['activeName', name]);
    return get(currentModal, 'params') ?? {};
  }

  function hide(name: string) {
    unlockScroll(name);
    modalStack.value = filter(
      modalStack.value,
      modal => modal.activeName !== name,
    );
    clearEventListenerForEmptyStack();
  }

  function hideLast() {
    const last = modalStack.value.pop();
    if (last) {
      unlockScroll(last.activeName);
    }
    clearEventListenerForEmptyStack();
  }

  function clearEventListenerForEmptyStack() {
    if (isEmpty(modalStack.value)) {
      document.removeEventListener('keydown', escapeHandler);
      document.addEventListener('backbutton', hideLast);
    }
  }

  return {
    isVisible,
    show,
    getParams,
    hide,
  };
}
