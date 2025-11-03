// controllers/courierController.js
const Courier = require("../models/Courier");


// ✅ Add Courier (User)
const addCourier = async (req, res) => {
  try {
    // ✅ Generate tracking ID here
    const trackingId = "TRK" + Date.now();

    const courier = new Courier({
      trackingId,                     // Add generated tracking ID
      senderName: req.body.senderName,
      senderAddress: req.body.senderAddress,
      receiverName: req.body.receiverName,
      receiverAddress: req.body.receiverAddress,
      courierType: req.body.courierType,
      weight: req.body.weight,
      userId: req.user.id,            // ✅ Should match schema (userId)
      timeline: [
        {
          status: "Pending",
          message: "Courier Created",
          date: new Date(),
        },
      ],
    });

    await courier.save();

    res.status(201).json({
      message: "Courier added successfully ✅",
      trackingId: courier.trackingId,
    });

  } catch (err) {
    console.error("❌ ADD COURIER ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
};


// ✅ Get Logged-in User Couriers
const getUserCouriers = async (req, res) => {
  try {
    const couriers = await Courier.find({ userId: req.user.id });
    res.status(200).json(couriers);
  } catch (err) {
    console.error("❌ Fetch Error:", err.message);
    res.status(500).json({ message: "Failed to fetch user couriers" });
  }
};



// ✅ Get All Couriers (Admin Only)
const getAllCouriers = async (req, res) => {
  try {
    const couriers = await Courier.find();
    res.status(200).json({ success: true, couriers });
  } catch (err) {
    console.error("❌ ERROR fetching all couriers:", err);
    res.status(500).json({ success: false, message: "Failed to fetch couriers" });
  }
};


// ✅ Update / Edit Courier
const updateCourier = async (req, res) => {
  try {
    const updated = await Courier.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Courier not found" });
    }

    res.status(200).json({ success: true, message: "Updated successfully", updated });
  } catch (err) {
    console.error("❌ ERROR updating courier:", err);
    res.status(500).json({ success: false, message: "Failed to update courier" });
  }
};


// ✅ Delete Courier
const deleteCourier = async (req, res) => {
  try {
    const deleted = await Courier.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Courier not found" });
    }

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error("❌ ERROR deleting courier:", err);
    res.status(500).json({ success: false, message: "Failed to delete courier" });
  }
};


module.exports = {
  addCourier,
  getUserCouriers,
  getAllCouriers,
  updateCourier,
  deleteCourier,
};
