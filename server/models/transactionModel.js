import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    panel_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "panel",
      required: true,
    },
    performedBy: {
      type: String,
      enum: ["employee", "owner"],
      required: true,
    },
    employee_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee",
      required: function () {
        return this.performedBy === "employee";
      },
      default: null,
    },

    service_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "service",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    employeePercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    employeeEarning: {
      type: Number,
      required: true,
      min: 0,
    },

    ownerEarning: {
      type: Number,
      required: true,
      min: 0,
    },

    processed: {
      type: Boolean,
      default: false,
    },

    processedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Transaction = mongoose.model("transaction", transactionSchema);
export default Transaction;
