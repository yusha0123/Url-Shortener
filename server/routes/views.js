const { Router } = require("express");
const { handleFrontEnd, handleRedirect } = require("../controllers/views");

const router = Router();

router.route(["/login", "/register", "/home", "/"]).get(handleFrontEnd);
router.route("/:id").get(handleRedirect);

module.exports = router;
