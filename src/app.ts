import express, { json } from "express";
import "express-async-errors";
import errorHandler from "./middlewares/errorHandler";
import router from "./routers/index.routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app
    .use(json())
    .use(router)
    .use(errorHandler);

export default app;