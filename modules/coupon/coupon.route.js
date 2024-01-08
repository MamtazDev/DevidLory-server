const express = require("express");
const {
  addCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
  getBookCouponInfo,
} = require("./coupon.controller");

const router = express.Router();

router.post("/add", addCoupon);
router.get("/", getCoupons);
router.put("/edit", updateCoupon);
router.delete("/delete/:id", deleteCoupon);
router.get("/bookInfo/:id", getBookCouponInfo);

module.exports = router;
