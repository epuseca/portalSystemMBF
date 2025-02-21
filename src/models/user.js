const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const mongoose_delete = require('mongoose-delete');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: { type: String, default: 'Mobifone' },
  sex: { type: String, enum: ["male", "female"], required: true, default: 'male' },
  role: { type: String, enum: ["admin"], required: true , default: 'admin'},
  username: { type: String, required: true },
  password: { type: String, required: true, default: '123456' },
  image: { type: String, required: false },
  description: Array,
});

userSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;
