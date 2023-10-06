import rateLimit from "express-rate-limit";

const createRateLimiter = ({ windowMs, max, message, ...options } = {}) => {
  windowMs = windowMs ?? 5 * 60 * 1000;
  max = max ?? 15;
  message = message ?? 'Request timed out';

  return rateLimit({
    windowMs,
    max,
    message,
    standardHeaders: true,
    legacyHeaders: false,
    skip(request) {
      if (
        request.url.startsWith("/public") ||
        request.url.endsWith("/documentation")
      ) {
        return true;
      }

      if (request.method === "OPTIONS") {
        return true;
      }

      return false;
    },
    ...options,
  });
};

export default createRateLimiter;
