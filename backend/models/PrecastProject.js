import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import _ from "lodash";
import mongoose from "mongoose";

dayjs.extend(buddhistEra);
const schema = new mongoose.Schema(
  {
    name: { type: String },
    beams: [
      {
        name: { type: String },
        width: { type: Number },
        length: { type: Number },
        structure: {
          db12: { type: Number },
          db16: { type: Number },
          db20: { type: Number },
          db25: { type: Number },
        },
        casing: {
          rb6: { type: Number },
          rb9: { type: Number },
        },
        amount: { type: Number },
        casting_amount: { type: Number },
        at: { type: Number },
        width_list: [
          {
            length: { type: Number },
            amount: { type: Number },
            structure: {
              db12: { type: Number },
              db16: { type: Number },
              db20: { type: Number },
              db25: { type: Number },
            },
            casing: {
              rb6: { type: Number },
              rb9: { type: Number },
            },
          },
        ],
      },
    ],
    process: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Process",
    },
  },
  { timestamps: true }
);

schema.methods.toJSON = function () {
  return {
    _id: this._id,
    id: this._id,
    name: this.name,
    beams: this.beams,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

// Custom field before save
schema.pre("save", (next) => {
  next();
});

export default mongoose.model("PrecastProject", schema, undefined, {
  overwriteModels: true,
});
