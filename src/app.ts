import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import router from '@/routers/index.routes';
import errorHandler from '@/middlewares/errorHandler';

dotenv.config();

const app = express();
app.use(helmet()).use(json()).use(cors()).use(router).use(errorHandler);

export default app;
