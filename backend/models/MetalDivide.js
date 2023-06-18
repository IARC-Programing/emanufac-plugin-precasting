import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import _ from "lodash";
import mongoose from "mongoose";

dayjs.extend(buddhistEra);
const schema = new mongoose.Schema(
  {
    prefix: {
      type: String,
      default: "BJMD",
    },
    running_number: {
      type: String,
    },
    manufacturing_order: {
      type: mongoose.Types.ObjectId,
      ref: "ManufacturingOrder",
    },
    process: {
      type: mongoose.Types.ObjectId,
      ref: "Process",
    },
    divide_sets: [
      {
        step: { type: Number },
        length: { type: Number },
        amount: { type: Number },
        so_number: { type: String },
        customer: { type: mongoose.Types.ObjectId, ref: "Customer" },
        lost: { type: Number },
        remark: { type: String },
        in_warehouse: { type: Boolean, default: false },
        product_stock_lot: [
          {
            lotId: {
              type: mongoose.Types.ObjectId,
              ref: "ProductStockLot",
            },
          },
        ],
        is_waste: { type: Boolean, default: false },
        failure_index: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

schema.methods.toJSON = function () {
  return {
    _id: this._id,
    id: this._id,
    running_number: this.prefix + this.running_number,
    prefix: this.prefix,
    manufacturing_order: this.manufacturing_order,
    process: this.manufacturing_order,
    divide_sets: this.divide_sets,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};
schema.pre("save", async function (next) {
  try {
    const obj = (await mongoose.models.MatalDivide.findOne().sort({
      createdAt: -1,
    })) || { running_number: "00000" };
    const start =
      dayjs().format("BB").toString() + (dayjs().month() + 1).toString();

    if (_.startsWith(obj.running_number, start)) {
      this.running_number = (parseInt(obj.running_number, 10) + 1).toString();
      return next();
    }
    this.running_number = `${start}00001`;
    return next();
  } catch (err) {
    this.running_number = `${start}00001`;
    return next();
  }
});
export default mongoose.model("MatalDivide", schema, undefined, {
  overwriteModels: true,
});
