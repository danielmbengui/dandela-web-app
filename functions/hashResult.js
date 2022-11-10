import { createHash } from 'crypto';

export const hashResult = (string) => {
  return createHash('sha256').update(string).digest('hex');
}