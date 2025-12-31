import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true } //created at and update at
);

const User = mongoose.model("User", userSchema); //we are creating a model named User using the userSchema

export default User; //exporting the model to use it in other parts of the application and where User is name of the collection in the database
