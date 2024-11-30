import { CookieOptions } from 'express';

export const refreshTokenOptions: CookieOptions = {
  httpOnly: process.env.NODE_ENV === 'production',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
};
