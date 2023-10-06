import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      (format) =>
        `${format.timestamp} [${format.level.toUpperCase()}] ${format.message}`
    )
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/info.log", level: "info" }),
  ],
});

export const stream = {
    write(data) {
        logger.info(data.trim());
    }
}

export default logger;


