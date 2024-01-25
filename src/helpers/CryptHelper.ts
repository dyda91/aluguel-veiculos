import crypto from 'node:crypto';

const salt = process.env.PASSWORD_SALT!;

export const encrypt = (value: string) => {
  return crypto.pbkdf2Sync(value, salt, 100000, 64, 'sha512').toString('hex');
}