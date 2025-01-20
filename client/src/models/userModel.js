import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Check if the model exists in the `models` object, otherwise create it
const UserModel = models.users || model("users", userSchema);

export default UserModel;
