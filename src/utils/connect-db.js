import mongoose from "mongoose";
import { DB_URL } from "../config/index.js";
import logger from "./logger.js";

const connectDb = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

export default connectDb;
