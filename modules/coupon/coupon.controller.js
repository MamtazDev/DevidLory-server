const Coupon = require("./coupon.model");

const addCoupon = async (req, res) => {
  try {
    const { code, discount, status } = req.body;
    const coupon = new Coupon({
      code,
      discount,
      status,
    });

    const addCoupon = await coupon.save();

    res.status(200).send(addCoupon);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCoupon = async (req, res) => {
  try {
    const isExist = await Coupon.find({});

    if (isExist?.length > 0) {
      res.status(200).send({
        coupon: isExist,
        success: true,
      });
    } else {
      res.status(200).send({
        message: "No copun code found!",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateCoupon = async (req, res) => {
  try {
    const { code, discount, status, couponId } = req.body;

    const coupon = await Coupon.findById(couponId);

    if (coupon) {
      coupon.code = code;
      coupon.discount = discount;
      coupon.status = status;

      await coupon.save();
      res.status(200).send({
        data: coupon,
        message: "Coupon updated successfully",
        status: 200,
      });
    } else {
      res.status(401).send({
        message: "There is no such coupon",
        status: 400,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  addCoupon,
  getCoupon,
  updateCoupon,
};
