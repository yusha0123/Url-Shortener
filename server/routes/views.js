const { Router } = require("express");
const { handleViews } = require("../controllers/views");

const router = Router();

router.route("/:id").get(handleViews);

module.exports = router;
