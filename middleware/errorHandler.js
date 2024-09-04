'use strict';

/**
 * Custom Error Handler
 * @module middleware/ErrorHandler
 * @function
 * @param {*} err - Error
 * @param {*} req - Request
 * @param {*} res - Response
 * @param {*} next - Next Handler to Call
 * @returns Middleware configured
 *
 * @example
 * // Must be LAST Use()
 * var ErrorHandler = require('./middleware/errorHandler.js');
 * app.use(ErrorHandler);
 * @see {@link https://dev.to/qbentil/how-to-write-custom-error-handler-middleware-in-expressjs-using-javascript-29j1|Custom Error Handler Example}
 */
module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Server Error';
  const payload = {
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  };
  res.status(errStatus).json(payload);
};
