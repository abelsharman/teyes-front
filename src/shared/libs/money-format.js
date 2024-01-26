export const currencyCode = {
  KZT: '₸',
  RUB: '₽',
  EUR: '€',
  USD: '$',
};

export function getCurrencyCode(currency) {
  return currencyCode[currency] || currency;
}

export function moneyFormat(money) {
  const moneyFormat = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0,
  });

  return moneyFormat.format(money);
}

export function prettyPrice(amount, currency) {
  return `${moneyFormat(amount)} ${
    currency ? getCurrencyCode(currency) : ''
  }`.trim();
}