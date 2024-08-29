import mongoose from "mongoose";


const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    nametr: {
      type: String,
      required: true,
      trim: true,
      default: '',
    },


    
    cover: {
      type: String,
      required: true,
      default: "",
    
    },



    description: String,
    addBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
{
  returnNewDocument: true,
  new: true,
  strict: false
}
);

schema.virtual("id").get(function () {
  return this._id;
});

schema.set("toJSON", {
  virtuals: true,
});




export default mongoose.models.Category || mongoose.model("Category", schema);

