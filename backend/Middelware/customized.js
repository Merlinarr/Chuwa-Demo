exports.CheckAdmin = async (req, res, next) => {
  const user = req.user;
  if (user.role == "admin") {
    return next();
  }
  return res
    .status(403)
    .send("Permission verification failed. Please check and try again.");
};
