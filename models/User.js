const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is not valid ");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 1);
  console.log(this.password);
  next();
});

//static method to login user

userSchema.statics.login = async function (email, password) {
  const user = await User.findOne({ email: email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      console.log(auth, "bcrypt.compare is true");
      return user;
    }

    if (auth === false) {
      console.log(auth, "bcrypt.compare is false");
    }
    // throw Error("incorrect password");
  }
  //   throw Error("incorrect email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
