const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const messageSchema = require('./Message')
// import schema from Book.js
// const bookSchema = require("./Book");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    lookingFor: {
      type: String,
      required: true,
    },
    about: {
      type: String,
    },
    dob: {
      type: Date,

    },
    image: {
      type: String,

    },
    gallery: [
      {
        name: String,
        imageUrl: String
      }
    ], 
    inbox: [messageSchema],
    outbox: [messageSchema],
    hobbies: [
      {
        type: String,
      }
    ],
    interests: [
      {
        type: String,
      }
    ],
    matches: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    isToxic: {
      type: Boolean,
      default: false
    }
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
