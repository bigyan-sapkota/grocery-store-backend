import { UserSnapshot } from '../../src/schemas/user.schema';

declare global {
  namespace Express {
    interface User extends UserSnapshot {}
  }
}
