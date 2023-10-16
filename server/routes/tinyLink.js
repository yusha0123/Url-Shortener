const express = require("express");
const {
  shorten,
  getData,
  deleteUrl,
  updateUrl,
} = require("../controllers/tinyLink");
const authCheck = require("../middleware/authCheck");

const router = express.Router();

router.route("/").post(authCheck, shorten);
router.route("/").get(authCheck, getData);
router.route("/:id").delete(authCheck, deleteUrl);
router.route("/:id").put(authCheck, updateUrl);

module.exports = router;
