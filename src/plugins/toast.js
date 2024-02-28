export const toast = {
  async error(message, title = 'Ошибка') {
    const iZtoast = await import('izitoast');
    return iZtoast?.error({
      title: title,
      message: message,
      position: 'bottomCenter',
    });
  },
  async success(message, title = 'Успешно') {
    const iZtoast = await import('izitoast');
    return iZtoast?.success({
      title: title,
      message: message,
      position: 'bottomCenter',
    });
  },
};
