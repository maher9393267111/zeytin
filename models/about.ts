import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {

    name: String,
    title: String,
    address: String,
    shortAddress: String,
    email: String,
    description: String,
    phoneHeader: String,
    phoneFooter: String,
    copyright: String,
    logo: Array,
    favicon: Array,
    gatewayImage: Array,
    headerCustomScript: String,
    footerCustomScript: String,
    language: { type: String, default: "en" },
    footerBanner: {
      security: {
        title: String,
        description: String,
      },
      support: {
        title: String,
        description: String,
      },
      delivery: {
        title: String,
        description: String,
      },
    },
    seo: {
      title: String,
      description: String,
      keyword: String,
      image: Array,
    },
    social: {
      facebook: String,
      instagram: String,
      twitter: String,
      youtube: String,
      pinterest: String,
    },
    currency: {
      name: { type: String, default: "USD" },
      symbol: { type: String, default: "$" },
      exchangeRate: { type: Number, default: 1 },
    },
    color: {
      primary: String,
      primary_hover: String,
      secondary: String,
      body_gray: String,
      body_gray_contrast: String,
      primary_contrast: String,
      primary_hover_contrast: String,
      secondary_contrast: String,
    },
    script: {
      googleSiteVerificationId: String,
      facebookAppId: String,
      googleAnalyticsId: String,
      facebookPixelId: String,
      messengerPageId: String,
    },
    paymentGateway: {
      cod: { type: Boolean, default: true },
      paypal: { type: Boolean, default: false },
      stripe: { type: Boolean, default: false },
      sslCommerz: { type: Boolean, default: false },
      razorpay: { type: Boolean, default: false },
    },
    login: {
      facebook: { type: Boolean, default: false },
      google: { type: Boolean, default: false },
    },
    security: {
      loginForPurchase: { type: Boolean, default: true },
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

export default mongoose.models.About || mongoose.model("About", schema);
