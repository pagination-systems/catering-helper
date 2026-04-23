/* eslint-disable @typescript-eslint/no-namespace */
import { ISession } from '@catering/types';

declare global {
  namespace Express {
    interface Request {
      session?: ISession;
    }
  }
}
