const URL = require("../models/Url");
const path = require("path");

const handleViews = async (req, res, next) => {
  const staticRoutes = ["/login", "/register", "/home", "/"];
  const id = req.params.id;

  if (staticRoutes.includes(id)) {
    return res.sendFile(path.join(__dirname, "../dist", "index.html"));
  }

  try {
    const url = await URL.findOne({ shortId: id });
    if (!url) {
      return res.sendFile(path.join(__dirname, "../dist", "index.html"));
    }

    url.clicks++;
    await url.save();
    return res.redirect(url.redirectUrl);
  } catch (error) {
    return next(error);
  }
};

module.exports = { handleViews };
