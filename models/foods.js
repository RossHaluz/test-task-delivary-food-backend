const { Schema, model } = require("mongoose");
const Joi = require("joi");

const schema = Joi.object({
  title: Joi.string().required(),
  img: Joi.string().required(),
  desc: Joi.string().required(),
  price: Joi.number().required(),
});

const FoodSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      require: true,
    },
    favorite: {
      type: [Schema.Types.ObjectId],
      ref: "users",
      default: [],
      require: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const FoodModel = model("food", FoodSchema);

module.exports = {
  FoodModel,
};
