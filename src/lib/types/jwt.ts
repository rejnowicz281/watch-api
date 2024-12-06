export type AccessTokenPayload = {
  sub: string;
  email: string;
  name: string;
};

export type RefreshTokenPayload = {
  sub: string;
};
