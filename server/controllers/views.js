const URL = require("../models/Url");
const path = require("path");

const handleFrontEnd = (req, res, next) => {
  return res.sendFile(path.join(__dirname, "../dist", "index.html"));
};

const handleRedirect = async (req, res, next) => {
  const id = req.params.id;
  try {
    const url = await URL.findOne({ shortId: id });
    if (!url) {
      return res.sendFile(path.join(__dirname, "../dist", "index.html"));
    }
    url.clicks++;
    url.save();
    res.redirect(url.redirectUrl);
  } catch (error) {
    next(error);
  }
};

module.exports = { handleFrontEnd, handleRedirect };
