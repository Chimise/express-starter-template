import { ZodError, ZodSchema } from "zod";
import ResponseHandler from "../utils/response-handler.js";

const validator =
  (schema, type = "body") =>
  async (req, res, next) => {
    if (!(schema instanceof ZodSchema)) {
      throw new Error("Invalid schema type");
    }

    try {
      const data = req[type];
      const parsedData = await schema.parseAsync(data);
      req[type] = parsedData;
      next();
    } catch (error) {

      return ResponseHandler.zerror(res, error);
    }
  };

export default validator;
