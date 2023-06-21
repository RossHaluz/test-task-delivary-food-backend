const { Schema, model } = require("mongoose");

const authSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  avatarUrl: {
    type: String,
    require: true

  },
  token: {
    type: String,
  },
});

const authModel = model("user", authSchema);

module.exports = authModel;
