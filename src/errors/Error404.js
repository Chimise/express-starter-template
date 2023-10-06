import AppError from "./AppError.js";

class Error404 extends AppError {
    constructor(message) {
        super(message, 404, true);
    }
}


export default Error404;