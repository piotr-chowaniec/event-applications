class FetchingError extends Error {
  constructor(message, status) {
    super(message);

    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchingError);
    }

    this.isFetchingError = true;
    this.status = status;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);

    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthorizedError);
    }

    this.isAuthorizationError = true;
  }
}

export default {
  FetchingError: (message, status) => new FetchingError(message, status),
  UnauthorizedError: message => new UnauthorizedError(message),
};
