import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trime: true,

    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const User = models.user || mongoose.model("user", UserSchema);
export default User;
