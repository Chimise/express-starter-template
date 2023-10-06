import AppError from "./AppError.js";

class Error400 extends AppError {
    constructor(message) {
        super(message || 'Invalid user input', 400, true);
    }
}

export default Error400;