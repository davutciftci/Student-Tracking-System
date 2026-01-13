import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '../config/env';

interface JwtPayload {
    userId: string;
    email: string;
    role: string;
}

export const generateAccessToken = (payload: JwtPayload): string => {
    const options: SignOptions = {
        expiresIn: config.jwt.accessExpiration as any,
    };
    return jwt.sign(payload, config.jwt.accessSecret, options);
};

export const generateRefreshToken = (payload: JwtPayload): string => {
    const options: SignOptions = {
        expiresIn: config.jwt.refreshExpiration as any,
    };
    return jwt.sign(payload, config.jwt.refreshSecret, options);
};

export const verifyAccessToken = (token: string): JwtPayload => {
    return jwt.verify(token, config.jwt.accessSecret) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
    return jwt.verify(token, config.jwt.refreshSecret) as JwtPayload;
};