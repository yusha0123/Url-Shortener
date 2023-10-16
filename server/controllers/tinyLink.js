const URLs = require("../models/Url");
const ErrorResponse = require("../utils/errorResponse");
const shortid = require("shortid");
const validUrl = require("valid-url");

const shorten = async (req, res, next) => {
  const { redirectUrl } = req.body;
  if (!redirectUrl) {
    return next(new ErrorResponse("Please provide an URL!", 400));
  }

  if (!validUrl.isUri(redirectUrl)) {
    return res.status(400).json({
      invalidUrl: true,
      success: false,
    });
  }

  try {
    const shortId = shortid.generate();
    const result = await URLs.create({
      userId: req.userId,
      shortId: shortId,
      redirectUrl: redirectUrl,
      shortUrl: `${process.env.SITE_URL}/${shortId}`,
    });
    return res.status(201).json({
      success: true,
      shortUrl: result.shortUrl,
      LongUrl: result.redirectUrl,
    });
  } catch (error) {
    next(error);
  }
};

const getData = async (req, res, next) => {
  try {
    const data = await URLs.find(
      { userId: req.userId },
      {
        userId: 0,
        shortId: 0,
        updatedAt: 0,
      }
    );
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteUrl = async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(new ErrorResponse("Please provide an ID!", 400));
  }

  try {
    await URLs.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "URL deleted Successfully!",
    });
  } catch (error) {
    next(error);
  }
};

const updateUrl = async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(new ErrorResponse("Please provide an ID!", 400));
  }

  const { newUrl } = req.body;
  if (!newUrl) {
    return next(new ErrorResponse("New Url is missing!", 400));
  }

  if (!validUrl.isUri(newUrl)) {
    return next(new ErrorResponse("Invalid URL!", 400));
  }

  try {
    await URLs.findByIdAndUpdate(id, {
      redirectUrl: newUrl,
    });
    return res.status(200).json({
      success: true,
      message: "URL updated Successfully!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { shorten, getData, updateUrl, deleteUrl };
