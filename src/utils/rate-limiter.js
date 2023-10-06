import rateLimit from "express-rate-limit";

const createRateLimiter = ({max, windowMs, message} = {}) => {
    return rateLimit({
        max,
        windowMs,
        message,
        skip(request) {
            if(request.url.startsWith('/public') || request.url.endsWith('/documentation')) {
                return true;
            }

            if(request.method === 'OPTIONS') {
                return true;
            }

            return false;
        }

    })
}