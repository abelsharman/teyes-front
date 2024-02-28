import { defaultsDeep, isError } from 'lodash-es';
//TODO: refactor for ts

// extra parens required to allow JSDoc infer type "as const"
// eslint-disable-next-line no-extra-parens
const ERR = /** @type {const} */ {
};

/**
 * @description
 * This error can be thrown to
 * then finally catch it and pass to logError
 */
class ApplicationError extends Error {
  scopeContext: any;

  /**
   * @param {string} message
   * @param {{
   *   scopeContext?: import('@sentry/types').ScopeContext
   *   cause?: Error
   * }} params
   */
  constructor(message: string, { scopeContext, cause }: any = {}) {
    super(message);

    this.scopeContext = defaultsDeep(scopeContext, cause?.scopeContext) ?? null;
    this.cause = cause ?? null;
  }
}

function concatMessage(code: any, cause: Error) {
  const unPrefixedCode = cause.message.replace(/^ERR_/, '');
  const isPreDefinedCode = unPrefixedCode in ERR;

  return isPreDefinedCode
    ? `${code} > ${cause.message}`
    : `${code}: ${cause.message}`;
}

/**
 * @typedef LogParams
 * @property {Error} cause
 * @property {import('@sentry/types').ScopeContext} [scopeContext]
 *
 * @typedef {typeof ERR[keyof typeof ERR]} ErrorCode
 */

function normalizeArgs(
  errorOrCode: ApplicationError | typeof ERR[keyof typeof ERR] | Error,
  params: any,
) {
  if (errorOrCode instanceof ApplicationError) {
    return {
      code: errorOrCode.message,
      cause: errorOrCode.cause,
      scopeContext: defaultsDeep(params.scopeContext, errorOrCode.scopeContext),
    };
  }

  return {
    code: errorOrCode,
    scopeContext: params.scopeContext,
    cause: params.cause,
  };
}

/**
 * @param {ErrorCode | ApplicationError} errorOrCode
 * @param {LogParams} params
 */
function logError(
  errorOrCode: typeof ERR[keyof typeof ERR] | ApplicationError | Error,
  params = {},
) {
  const { code, cause } = normalizeArgs(errorOrCode, params);

  if (!isError(cause)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return;
  }

  const message = concatMessage(code, cause);
  const exception = new Error(message);
  exception.cause = cause;

}

export { ERR, ApplicationError, logError };
