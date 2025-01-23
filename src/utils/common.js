export const globalErrorHandler = (err, req, res, next) => {
  // Log the error for debugging purposes
  console.error(err);

  // Handle MongoDB Duplicate Key Error (E11000)
  if (err.name === 'MongoServerError' && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    return res.status(400).json({
      message: `Duplicate value for '${field}': '${value}'. Please use a different value.`,
    });
  }

  // Handle Validation Errors (e.g., Mongoose validation errors)
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((el) => el.message);
    return res.status(400).json({
      message: 'Validation error',
      errors,
    });
  }

  // General Error Handler
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
  });
};

export const validation = {
  validateParamsWithJoi: (data, schema) => {
    const { error, value } = schema.validate(data, { abortEarly: false }); // abortEarly: false to capture all errors
    if (error) {
      return { isValid: false, errors: error.details };
    }
    return { isValid: true, value };
  },
};

// export const validation = (payload, schema) => {
//   const { error } = schema.validate(payload, {
//     abortEarly: false,
//   });
//   if (error) {
//     return res.badRequest({
//       message: "Validation failed",
//       data: error.details.map((e) => e.message),
//     });
//   }
//   next();
// };

export const setPagination = (size = 10, page = 1) => {
  let limit = Number.parseInt(size);
  let pageInt = Number.parseInt(page);
  let skip = size * (pageInt - 1);
  return {
    skip,
    limit,
  };
};
