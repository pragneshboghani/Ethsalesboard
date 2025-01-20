export const validation = (payload, schema) => {
  const { error } = schema.validate(payload, {
    abortEarly: false,
  });
  if (error) {
    return res.badRequest({
      message: "Validation failed",
      data: error.details.map((e) => e.message),
    });
  }
  next();
};

export const setPagination = (size = 10, page = 1) => {
  let limit = Number.parseInt(size);
  let pageInt = Number.parseInt(page);
  let skip = size * (pageInt - 1);
  return {
    skip,
    limit,
  };
};
