import path from "node:path";
import express from "express";
import morgan from "morgan";
import cors from 'cors';
import helmet from "helmet";
import {stream} from './utils/logger.js';
import registerAuthRoute from "./api/auth/index.js";
import errorHandler from "./middleware/error-handler.js";
import connectDb from "./utils/connect-db.js";
import setupSwaggerUI from "./api/documentation/index.js";
import Error404 from "./errors/Error404.js";
import createRateLimiter from "./middleware/rate-limiter.js";
import { IS_PROD_ENV } from "./config/index.js";

const port = process.env.PORT || 5000;

const app = express();

/* 
  Application security
**/

app.use(morgan(IS_PROD_ENV ? 'combined' : 'dev', {stream}));
app.use(cors());
app.use(helmet());
app.disable("x-powered-by");

/* 
  Body Parsing middlewares
**/
app.use(express.json({limit: '30mb'}));
app.use(express.urlencoded({extended: false, limit: '30mb'}));


app.use("/public", express.static(path.join(process.cwd(), "./public")));

if (IS_PROD_ENV) {
  app.use(createRateLimiter());
}

app.get("/api/v1", (req, res) => res.send("OK"));

setupSwaggerUI(app);

const apiRouter = express.Router();

registerAuthRoute(apiRouter);

app.use(apiRouter);

app.all("*", (req, res, next) => {
  next(new Error404("Route not found"));
});

app.use(errorHandler);

connectDb().then(() => {
  app.listen(port, () => {
    console.log("Server listening on PORT %d", port);
  });
});
