import mongoose from "mongoose";
const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    phone: {
      type: String,
      required: true,
    },

    salary: {
      method: {
        type: String,
        enum: ["fixed", "percentage", "hybrid"],
        required: true,
      },
      fixed: {
        type: Number,
        required: function () {
          return this.method === "fixed" || this.method === "hybrid";
        },
      },

      frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly"],
        required: function () {
          return this.method === "fixed" || this.method === "hybrid";
        },
      },
      percentage: {
        type: Number,
        required: function () {
          return this.method === "percentage" || this.method === "hybrid";
        },
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    joinedDate: {
      type: Date,
      default: Date.now,
    },
    panel_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "panel"
    }
  },

  {
    timestamps: true,
    versionKey: false,
  },
);

const Employee = mongoose.model("employee", employeeSchema);
export default Employee;
