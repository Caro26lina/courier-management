const mongoose = require("mongoose");

const courierSchema = new mongoose.Schema(
  {
    trackingId: { type: String, required: true, trim: true },

    senderName: { type: String, required: true, trim: true },
    senderAddress: { type: String, required: true, trim: true },

    receiverName: { type: String, required: true, trim: true },
    receiverAddress: { type: String, required: true, trim: true },

    courierType: { type: String, required: true, trim: true },
    weight: { type: Number, required: true },

    status: { type: String, default: "Pending", trim: true },

    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // ✅ Always have timeline array even if empty
    timeline: {
      type: [
        {
          status: { type: String, trim: true },
          message: { type: String, trim: true },
          date: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Courier", courierSchema);
