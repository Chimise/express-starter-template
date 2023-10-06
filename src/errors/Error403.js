import AppError from "./AppError.js";

class Error403 extends AppError {
    constructor(message) {
        super(message || 'User not authorized', 403, true);
    }
}


export default Error403;