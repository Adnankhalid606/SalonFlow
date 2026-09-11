export const validate = (schema, source) => {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      return res.status(400).json({
        status: false,
        message: "Validation Failed",
        error: result.error.issues,
      });
    }
    if (source === "query") {
      Object.defineProperty(req, source,{
        value: result.data,
        writable: true,
        configurable: true,
        enumerable: true
      })
    } else {
      req[source] = result.data;
    }
    next();
  };
};
