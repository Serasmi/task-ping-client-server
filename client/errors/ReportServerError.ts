class ReportServerError extends Error {
  constructor(message = "Report server is unavailable") {
    super(message);
    Object.setPrototypeOf(this, ReportServerError.prototype);
  }
}

export default ReportServerError;
