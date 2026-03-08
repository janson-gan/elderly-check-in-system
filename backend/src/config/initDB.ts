import pool from './db';
import logger from './logger';
import fs from 'fs';
import path from 'path';

const initDB = async (): Promise<void> => {
    try {
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf-8');
        await pool.query(schema);
        logger.info("Database table initialised successfully.")
    } catch (error) {
        logger.error(`Database initialised falied: ${error}`)
    }
};

export default initDB;