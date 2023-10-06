import logger from "./logger.js";
import AppError from "../errors/AppError.js";
import { ZodError } from "zod";

class ResponseHandler {
  static success(res, data, status = 200) {
    if (data === undefined || data === null) {
      return res.sendStatus(200);
    }

    res.status(status).json(data);
  }

  static error(res, err) {
    if (err instanceof AppError) {
      const isClient =
        (err.code && [400, 401, 403, 404, 409, 422].includes(err.code)) ||
        err.isOperational;
        
      if (isClient) {
        logger.error(err.message, { type: "CLIENT_ERROR", error: err });
        return res.status(err.code).send(err.message);
      }

      logger.error(err.message, { type: "SERVER_ERROR", error: err });
      return res.status(500).send(err.message);
    }

    err && logger.error(err?.message ?? err, { error: err });
    res.status(500).send("An error occurred on the server");
  }

  static zerror(res, err) {
    if(!(err instanceof ZodError)) {
        return this.error(res, err);
    }

    return res.status(400).json({
        type: 'ZOD',
        error: err,
        messages: err.issues.map(iss => ({path: iss.path.join('.'), message: iss.message}))
    })
  }
}



export default ResponseHandler;