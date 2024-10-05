// src/auth/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service'; // Adjust path as necessary
import { JwtPayload } from './jwt-payload.interface'; // Create this interface for payload structure

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req.cookies?.Authentication,
      ]), // Extract token from cookies
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // Add your secret key here
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.findById(payload.sub); // Assuming payload has 'sub' as user ID
    return user; // Returns user object if found
  }
}
