const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 4,
      max: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email address: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a Strong Password: " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "Other"],
        message: `{VALUE} is not a valid gender type`,
      },

      // validate(value) {
      //     if(!["Male", "Female", "Other"].includes(value)){
      //         throw new Error('Invalid gender')
      //     }
      // },
    },

    photoUrl: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL: " + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about your Info",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHashSavedInDB = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHashSavedInDB
  );

  return isPasswordValid;
};

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
