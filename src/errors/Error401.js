import AppError from "./AppError.js";

class Error401 extends AppError {
    constructor(message) {
        super(message || 'Authentication failed', 401, true)
    }
}

export default Error401;