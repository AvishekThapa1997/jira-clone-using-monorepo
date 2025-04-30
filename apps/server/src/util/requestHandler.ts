import { logRequest } from "@/lib/logger.js";
import { Result } from "@jira-clone/core/types";
import { type RequestHandler, Request, Response } from "express";

type ExpressRequest<Body, Param, Query> = Request<Param, any, Body, Query>;

// Define reusable type aliases for request data
type RequestData<Body, Param, Query> = {
  payload: Body; // Request body
  param: Param; // URL parameters
  query: Query; // Query parameters
  req: ExpressRequest<Body, Param, Query>;
  res: Response;
};

// Define the structure of the result returned by the handler
type HandlerResult = {
  status: number; // HTTP status code
  result?: Result<any>; // Response data
};

// Define the generic handler type using the reusable types

type Handler<Payload, Param, Query> = (
  data: RequestData<Payload, Param, Query>
) => Promise<HandlerResult | void>;

type RequestHandlerParam<Payload = any, Param = any, Query = any> = {
  payload: Payload;
  params: Param;
  query: Query;
};

export type Payload<T> = Pick<RequestHandlerParam<T>, "payload">;
export type Param<P> = Pick<RequestHandlerParam<any, P>, "params">;
export type QueryParam<Q> = Pick<RequestHandlerParam<any, any, Q>, "query">;

/**
 * A utility function to wrap an async handler and handle request processing.
 * It extracts payload, params, and query from the request, invokes the handler,
 * and sends the response in a standardized format.
 *
 * @template Payload - Type of the request body
 * @template Param - Type of the URL parameters
 * @template Query - Type of the query parameters
 * @param handler - The async handler function to process the request
 * @returns An Express RequestHandler
 */

export const requestHandler = <T extends Partial<RequestHandlerParam>>(
  handler: Handler<T["payload"], T["params"], T["query"]>
): RequestHandler<T["params"], any, T["payload"], T["query"]> => {
  return async (req, res, next) => {
    try {
      logRequest(req);
      const payload = req.body as T["payload"];
      const param = req.params as T["params"];
      const query = req.query as T["query"];
      const handlerResult = await handler({ param, payload, query, req, res });
      // if no result returned , call next to proceed in next middleware
      if (!handlerResult) {
        next();
        return;
      }
      const { status: successStatus, result } = handlerResult;
      let status = result?.error ? result.error.code : successStatus;
      if (result?.data?.refreshToken) {
        delete result?.data?.refreshToken;
      }
      res.status(status).json(result);
    } catch (err) {
      next(err);
    }
  };
};
