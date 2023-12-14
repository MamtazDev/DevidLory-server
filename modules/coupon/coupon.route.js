const express = require("express");
const { addCoupon, getCoupon, updateCoupon } = require("./coupon.controller");

const router = express.Router();

router.post("/add", addCoupon);
router.get("/", getCoupon);
router.put("/edit", updateCoupon);

module.exports = router;
