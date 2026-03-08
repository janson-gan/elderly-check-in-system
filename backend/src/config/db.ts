import { Pool } from 'pg';
import dotenv from 'dotenv';
import logger from './logger';

dotenv.config()

// Create database connection using .env credentials
const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

// Test the connection
pool.connect((err, client, release) => {
    if (err) {
        logger.error(`Database connection failed: ${err.message}`);
    } else {
        logger.info(`Database connected successfully.`);
    }
    // Return the connection back to the pool after test connection
    release();
});

export default pool;