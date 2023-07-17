import { createHash } from 'node:crypto';

const generateHash = (str: string) => createHash('sha256').update(str).digest('hex');

export default generateHash;
