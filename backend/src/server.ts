import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/db'
import logger from './config/logger';
import initDB from './config/initDB';

// Load environment variables from .env file
dotenv.config();

const app: Application = express();

// Middleware
// Allow frontend talk to the backend
app.use(cors());
// Allow backend to read json data from requests
app.use(express());

// Test the route and server
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Elderly check-in System API is running.",
  });
});

// Start the server
const PORT: number = parseInt(process.env.PORT || '5000');
app.listen(PORT, async () => {
  logger.info(`Server running at port: ${PORT}`);
  await initDB();
});
