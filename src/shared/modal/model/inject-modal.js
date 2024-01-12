import { inject } from 'vue';
import { ModalControllerKey } from './create-modal-controller.ts';

export function injectModal() {
  const modal = inject(ModalControllerKey);

  if (!modal) {
    throw new Error('Modal controller was not provided');
  }

  return modal;
}
