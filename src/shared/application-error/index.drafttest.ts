import { vi, describe, it, expect } from 'vitest';
import { ApplicationError, logError, ERR } from '.';


describe('shared/lib/app-error', () => {
  describe('ApplicationError', () => {
    it('should merge cause scopeContext', () => {
      const first = new ApplicationError('_', {
        scopeContext: {
          extra: {
            order_id: 123,
          },
        },
      });

      const second = new ApplicationError('__', {
        cause: first,
        scopeContext: {
          extra: {
            date: '2022-10-10',
          },
          tags: {
            page: 'payment',
          },
        },
      });

      expect(second.scopeContext).toEqual({
        extra: {
          order_id: 123,
          date: '2022-10-10',
        },
        tags: {
          page: 'payment',
        },
      });
    });

    it('last scopeContext should override previous', () => {
      const first = new ApplicationError('_', {
        scopeContext: {
          extra: {
            test: 1,
          },
        },
      });

      const second = new ApplicationError('__', {
        cause: first,
        scopeContext: {
          extra: {
            test: 2,
          },
        },
      });

      expect(second.scopeContext.extra.test).toBe(2);
    });

    it('should link cause', () => {
      const cause = new Error('original error');

      const error = new ApplicationError('err', { cause });

      expect(error.cause).toBe(cause);
    });

    it('should set cause to null if missing', () => {
      const error = new ApplicationError('err');

      expect(error.cause).toBeNull();
    });
  });

  describe('logError', () => {
    it('should allow scopeContext to be missing', () => {
      logError(ERR.BILL_EXPIRED, {
        // cause: new Error('test'),
      });

    });

    it('should allow cause to be undefined', () => {
      logError(ERR.BILL_EXPIRED, {
        // cause: undefined,
      });

    });

    it('should concat cause message', () => {
      const cause = new Error('первая причина это ты');

      logError(ERR.BILL_EXPIRED, { cause });

    });

    it('should format well known cause ERR code', () => {
      logError(ERR.INIT_PAYMENT, {
        cause: new Error(ERR.BILL_EXPIRED),
      });

    });

    it('should log accumulated scopeContext', () => {
      const cause = new ApplicationError('whatever', {
        scopeContext: {
          extra: {
            test: 123,
          },
        },
      });

      logError(ERR.BILL_EXPIRED, {
        cause,
        scopeContext: {
          tags: {
            page: 'payment',
          },
        },
      });

    });

    describe('application error as argument', () => {
      it('should use correct error message', () => {
        const error = new ApplicationError('ERR_TEST');

        logError(error);

      });

      it('should use correct error message with cause', () => {
        const error = new ApplicationError('ERR_TEST', {
          cause: new Error('cause'),
        });

        logError(error);

      });

      it('should link cause', () => {
        const ORIGINAL_CAUSE = new Error('cause');

        const error = new ApplicationError('ERR_TEST', {
          cause: ORIGINAL_CAUSE,
        });

        logError(error);

      });

      it('should merge scope contexts', () => {
        const error = new ApplicationError('ERR_TEST', {
          scopeContext: {
            extra: {
              from_error: 'a',
            },
          },
        });

        logError(error, {
          scopeContext: {
            extra: {
              from_params: 'b',
            },
          },
        });

      });

      it('params scopeContext should override error scopeContext', () => {
        const error = new ApplicationError('ERR_TEST', {
          scopeContext: {
            extra: {
              test: 'SHOULD SKIP',
            },
          },
        });

        logError(error, {
          scopeContext: {
            extra: {
              test: 'OVERRIDEN',
            },
          },
        });

      });

      it('should merge scope contexts (error, params, cause)', () => {
        const cause = new ApplicationError('ERR_ORIG', {
          scopeContext: {
            extra: {
              from_cause: 'c',
            },
          },
        });

        const error = new ApplicationError('ERR_TEST', {
          scopeContext: {
            extra: {
              from_error: 'a',
            },
          },
          cause,
        });

        logError(error, {
          scopeContext: {
            extra: {
              from_params: 'b',
            },
          },
        });

      });
    });

    describe('any error as arg', () => {
      it('should log simple error as is', () => {
        logError(new Error('Network Error'));

      });
    });
  });
});
