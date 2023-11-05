import type {ErrorRequestHandler, Request} from 'express';
import type {RequestOptions, ResponseOptions} from 'node-mocks-http';
import {createRequest, createResponse} from 'node-mocks-http';
import type {ParamsDictionary, RequestHandler} from 'express-serve-static-core';
import type {ParsedQs} from 'qs';
const sinon = require('sinon');

export type TestHandlerOptions = RequestOptions & ResponseOptions;
export const request = async <
  P = ParamsDictionary,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ResBody = any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ReqBody = any,
  ReqQuery = ParsedQs,
>(
  handler: RequestHandler<P, ResBody, ReqBody, ReqQuery>,
  options?: TestHandlerOptions,
) => {
  const response = createResponse(options);
  // Passing `Request<P, ResBody, ReqBody, ReqQuery>` instead of `any` would have worked if only authors of these
  // typings didn't force T to extend Request with default generic parameters. Which is bloody stupid.
  await handler(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createRequest<Request<any, ResBody, ReqBody, any>>(options),
    response,
    sinon.fake(),
  );
  return response;
};

export const json = async <
  P = ParamsDictionary,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ResBody = any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ReqBody = any,
  ReqQuery = ParsedQs,
>(
  handler: RequestHandler<P, ResBody, ReqBody, ReqQuery>,
  options?: TestHandlerOptions,
) => {
  return (await request(handler, options))._getJSONData();
};

export const handleError = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  handler: ErrorRequestHandler,
  options?: TestHandlerOptions,
) => {
  const response = createResponse(options);
  handler(error, createRequest(options), response, sinon.fake());
  return response;
};
