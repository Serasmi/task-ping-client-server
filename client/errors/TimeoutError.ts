class TimeoutError extends Error {
  constructor(message = "Timeout error") {
    super(message);
    Object.setPrototypeOf(this, TimeoutError.prototype);
  }
}

export default TimeoutError;
