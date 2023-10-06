import ResponseHandler from "../utils/response-handler.js";
import { IS_DEV_ENV } from "../config/index.js";

const errorHandler = (err, req, res, next) => {
  if (IS_DEV_ENV) {
    console.error(err);
  }

  ResponseHandler.error(res, err);
};

export default errorHandler;
