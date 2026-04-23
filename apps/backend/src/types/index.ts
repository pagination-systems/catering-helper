// types/express.d.ts or @types/express/index.d.ts
import { ISession } from '@catering/types';

// Extend the Request interface to include the `user` property
declare global {
  namespace Express {
    interface Request {
      session?: ISession;
    }
  }
}
