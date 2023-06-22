const { ctrlWrapper, HttpError } = require("../healpers");
const authModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const gravatar = require("gravatar");
const crypto = require("crypto");
const fs = require("fs").promises

const avatarsDir = path.join(__dirname, "..", "public", "avatars");
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { name, password, email } = req.body;
  const user = await authModel.findOne({ email });
  if (user) {
    throw HttpError(400, "User already exists");
  }
  const avatarUrl = gravatar.url(email)
  const hashPass = await bcrypt.hash(password, 10);
  const createUser = await authModel.create({
    email,
    password: hashPass,
    name,
    avatarUrl
  });

  const payload = {
    id: createUser._id,
  };
  const token = await jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  const newUser = await authModel.findByIdAndUpdate(
    createUser._id,
    {
      token,
    },
    { new: true }
  );

  return res.json(newUser);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await authModel.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = await jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await authModel.findByIdAndUpdate(user._id, { token });
  res.json({
    user,
  });
};

const logout = async (req, res) => {
  const { id } = req.userId;
  await authModel.findByIdAndUpdate(id, { token: "" });

  res.json({
    message: "Success logout",
  });
};

const currentUser = async (req, res) => {
  const { id } = req.userId;
  const user = await authModel.findById(id);

  res.json(user);
};

const editUser = async (req, res) => {
  const { id } = req.userId;
let updateUser = {
  ...req.body
}

if(req.file){
  const {path: tempUpload, originalname} = req.file; 
  const filename = `${crypto.randomUUID()}_${originalname}`;
  const resultUpdate = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpdate);
  const avatarUrl = path.join("avatar", filename);

  updateUser = {
    ...req.body,
    avatarUrl: avatarUrl,
  }
}

const result = await authModel.findByIdAndUpdate(id, updateUser, {new: true})

if(!result){
  throw HttpError(404, "Not found")
}

const updateUserData = result.toObject()


  res.json(updateUserData);
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  currentUser: ctrlWrapper(currentUser),
  editUser: ctrlWrapper(editUser),
};
