export interface JwtPayload {
  sub: string; // The user ID
  role?: string; // Optional: User role if applicable
  iat?: number; // Issued at timestamp
  exp?: number; // Expiration timestamp
}
