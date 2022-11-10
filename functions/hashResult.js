import { createHash } from 'crypto';

export default function hashResult(string) {
  return createHash('sha256').update(string).digest('hex');
}