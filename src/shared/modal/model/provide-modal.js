import {
  createModalController,
  ModalControllerKey,
} from './create-modal-controller';

export const provideModal = {
  install(app) {
    app.provide(ModalControllerKey, createModalController());
  },
};
