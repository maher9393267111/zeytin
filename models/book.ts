import mongoose from "mongoose";
import User from "./user";
import Category from "./category";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    titletr: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },

    story: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },

    storytr: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },

    price: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    tprice: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    saudiprice: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    emiratesprice: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    egyptprice: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    omanprice: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    qatarprice: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    rating: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    cover: String,
    image: { type: [String], default: [] },
    sizes: { type: [String], default: [] },
    features: { type: [], default: [] },
    author: String,
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
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

schema.statics.paginate = async function ({
  limit = 9,
  page = 1,
  sort = -1,
  where = {},
}) {
  const skip = limit * (page - 1);
  const books = await this.find({ ...where })
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: sort })
    .populate({
      path: "category",
      select: "name nametr",
      model: Category,
    })
    .exec();

  const pages = Math.ceil((await this.count({ ...where }).exec()) / limit);
  const total = await this.count({}).exec();
  return {
    books,
    pages,
    total,
  };
};

schema.set("toJSON", {
  virtuals: true,
});

export default mongoose.models.Book || mongoose.model("Book", schema);
