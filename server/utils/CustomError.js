// used class for extending the built in Error

class CustomError extends Error {
  // it will receive the error message and
  constructor(message, statusCode) {
    // call the Error constructor with the message
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
