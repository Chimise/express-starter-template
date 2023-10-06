import path from 'node:path'
import express from "express";
import registerAuthRoute from "./api/auth/index.js";
import errorHandler from "./middleware/error-handler.js";
import connectDb from "./utils/connect-db.js";
import setupSwaggerUI from "./api/documentation/index.js";
import Error404 from './errors/Error404.js';

const app = express();

app.disable('x-powered-by');

const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/public', express.static(path.join(process.cwd(), './public')))

setupSwaggerUI(app);

app.get("/api/v1", (req, res) => res.send("OK"));

const apiRouter = express.Router();

registerAuthRoute(apiRouter);

app.use(apiRouter);

app.all('*', (req, res, next) => {
  next(new Error404('Route not found'));
})

app.use(errorHandler);


connectDb().then(() => {
  app.listen(port, () => {
    console.log("Server listening on PORT %d", port);
  });
});
