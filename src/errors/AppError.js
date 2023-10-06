
class AppError extends Error {
    constructor(message, statusCode, isOperational) {
        super(message);
        this.code = statusCode;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}

export default AppError;
