"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const database_1 = __importDefault(require("./config/database"));
const startServer = async () => {
    try {
        // Test database connection
        await database_1.default.$connect();
        console.log('✅ Database connected successfully');
        app_1.default.listen(env_1.config.port, () => {
            console.log(`🚀 Server running on port ${env_1.config.port}`);
            console.log(`📍 Environment: ${env_1.config.env}`);
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        await database_1.default.$disconnect();
        process.exit(1);
    }
};
startServer();
// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('⏳ Shutting down gracefully...');
    await database_1.default.$disconnect();
    process.exit(0);
});
//# sourceMappingURL=server.js.map