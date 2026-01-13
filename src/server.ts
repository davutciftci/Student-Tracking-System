import app from './app';
import { config } from './config/env';
import prisma from './config/database';

const startServer = async () => {
    try {
        // Test database connection
        await prisma.$connect();
        console.log('✅ Database connected successfully');

        app.listen(config.port, () => {
            console.log(`🚀 Server running on port ${config.port}`);
            console.log(`📍 Environment: ${config.env}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        await prisma.$disconnect();
        process.exit(1);
    }
};

startServer();

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('⏳ Shutting down gracefully...');
    await prisma.$disconnect();
    process.exit(0);
});
