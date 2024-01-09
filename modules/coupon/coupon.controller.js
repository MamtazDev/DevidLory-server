const Coupon = require("./coupon.model");

const addCoupon = async (req, res) => {
  try {
    const { ...info } = req.body;
    const coupon = new Coupon(info);

    const addCoupon = await coupon.save();

    res.status(200).send(addCoupon);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCoupons = async (req, res) => {
  try {
    const isExist = await Coupon.find({}).populate("book");

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
    const { couponId, ...info } = req.body;

    const coupon = await Coupon.findById(couponId);

    if (coupon) {
      const result = await Coupon.findByIdAndUpdate({ _id: couponId }, info, {
        new: true,
      });

      res.status(200).send({
        data: result,
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

const deleteCoupon = async (req, res) => {
  try {
    const result = await Coupon.deleteOne({ _id: req.params.id });
    res.status(200).json({
      status: 200,
      message: "Coupon Delete Successful!",
      data: result,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getBookCouponInfo = async (req, res) => {
  console.log(req.params, "apasse");
  try {
    const coupon = await Coupon.findOne({ book: req.params.id });
    console.log(coupon, "dfdfd");
    res.status(200).send(coupon);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  addCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
  getBookCouponInfo,
};
