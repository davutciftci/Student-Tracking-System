import dotenv from 'dotenv';

dotenv.config();

export const config = {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '5000', 10),
    database: {
        url: process.env.DATABASE_URL || '',
    },
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET || '',
        refreshSecret: process.env.JWT_REFRESH_SECRET || '',
        accessExpiration: process.env.JWT_ACCESS_EXPIRATION || '15m',
        refreshExpiration: process.env.JWT_REFRESH_EXPIRATION || '7d',
    },
    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    },
} as const;


const requiredEnvVars = [
    'DATABASE_URL',
    'JWT_ACCESS_SECRET',
    'JWT_REFRESH_SECRET',
];

requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
});