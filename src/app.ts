import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(helmet());
app.use(cors({ origin: config.cors.origin, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// @ts-ignore
app.get('/health', ((req: any, res: any) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
}) as any);

// Routes will be added here
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/students', studentRoutes);

// Error handler (must be last)
// @ts-ignore
app.use(errorHandler as any);

export default app;