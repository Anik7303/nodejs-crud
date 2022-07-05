exports.error = function (error, _req, res, _next) {
  const code = error.statusCode || 500;
  const message = error.message || "An unexpected error occured";
  res.status(code).json({ message });
};

exports.error404 = function (req, res, _next) {
  const { method, url } = req;
  const message = `${url} route for ${method.toUpperCase()} method does not exist.`;
  res.status(404).json({ message, method, url });
};
