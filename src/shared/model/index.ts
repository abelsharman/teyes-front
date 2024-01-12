const FIRST_NAME_KEY = 'sale-med:first-name';
const LAST_NAME_KEY = 'sale-med:last-name';
const PHONE_NUMBER_KEY = 'sale-med:phone-number';

export class SearchFormStorage {
  static #firstName: string = window.localStorage.getItem(
    FIRST_NAME_KEY
  ) as string;

  static get firstName(): string {
    return this.#firstName;
  }

  static set firstName(firstName: string) {
    this.#firstName = firstName;
    window.localStorage.setItem(FIRST_NAME_KEY, firstName);
  }


  static #lastName: string = window.localStorage.getItem(
    LAST_NAME_KEY
  ) as string;

  static get lastName(): string {
    return this.#lastName;
  }

  static set lastName(lastName: string) {
    this.#lastName = lastName;
    window.localStorage.setItem(LAST_NAME_KEY, lastName);
  }


  static #phoneNumber: string = window.localStorage.getItem(
    PHONE_NUMBER_KEY
  ) as string;

  static get phoneNumber(): string {
    return this.#phoneNumber;
  }

  static set phoneNumber(phoneNumber: string) {
    this.#phoneNumber = phoneNumber;
    window.localStorage.setItem(PHONE_NUMBER_KEY, phoneNumber);
  }
}
