import { Request, Response, NextFunction, CookieOptions } from 'express';
import { ISession } from '@catering/types';
import '../../types';

interface RequestObject {
  body: any;
  query: any;
  params: any;
  cookies: any;
  session: ISession | undefined;
  file?: any;
  ip: string;
  method: string;
  url: string;
  path: string;
  header: (name: string) => string | undefined;
  headers: object;
}

interface ResponseObject {
  statusCode: number;
  cookies?: Array<{ name: string; value: string; options?: CookieOptions }>;
  clearCookie?: string[];
  [key: string]: any;
}

export type ControllerParams = {
  req: RequestObject;
};

export function handleController(controller: ({ req }: ControllerParams) => Promise<ResponseObject>) {
  return (req: Request, res: Response, next: NextFunction) => {
    // prepare all the necessary request object that the controller needs
    const requestObject: RequestObject = {
      body: req.body,
      query: req.query,
      params: req.params,
      cookies: req.cookies,
      session: req.session,
      file: null,
      ip: req.ip ?? '',
      method: req.method,
      url: req.originalUrl,
      path: req.path,
      header: req.header,
      headers: req.headers,
    };

    // call the controller function with the prepared request object and send the response to the client also call the global error handler if any error occurs
    controller({ req: requestObject })
      .then((response) => {
        const { statusCode, cookies, clearCookie } = response;

        if (Array.isArray(cookies) && cookies.length > 0) {
          cookies.forEach((cookie) => {
            const { name, value, options } = cookie;
            if (options) {
              res.cookie(name, value, options);
            } else {
              res.cookie(name, value);
            }
          });
        }

        if (Array.isArray(clearCookie) && clearCookie.length > 0) {
          clearCookie.forEach((cookie) => {
            res.clearCookie(cookie);
          });
        }

        // Exclude cookies and clearCookie from the response object
        delete response.cookies;
        delete response.clearCookie;

        res.status(statusCode).json(response);
      })
      .catch(next);
  };
}
