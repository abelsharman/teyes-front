import { describe, it, expect, beforeEach } from 'vitest';
import { isMobile } from './is-mobile';

describe('isMobile', () => {
  const originalNavigator = navigator;
  beforeEach(() => {
    // eslint-disable-next-line no-global-assign
    navigator = originalNavigator;
  });

  it.each([
    {
      userAgent:
        'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
      expected: true,
    },
    {
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
      expected: true,
    },
    {
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246',
      expected: false,
    },
    {
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9',
      expected: false,
    },
    { userAgent: 'unknown', expected: false },
  ])(
    'should return "$expected" if user agent is $userAgent',
    ({ expected, userAgent }) => {
      //@ts-expect-error Override only necessary for the test fields
      // eslint-disable-next-line no-global-assign
      navigator = { userAgent };
      expect(isMobile()).toBe(expected);
    },
  );
});
