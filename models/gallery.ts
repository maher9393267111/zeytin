import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    desc: {
      type: String,
      required: true,
      trim: true,
    },

    desctr: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },

    cover: {
      type: String,
      required: true,
      default: "",
    },

    addBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

schema.virtual("id").get(function () {
  return this._id;
});

schema.set("toJSON", {
  virtuals: true,
});

export default mongoose.models.Gallery || mongoose.model("Gallery", schema);
