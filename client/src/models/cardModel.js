import { Schema, model, models } from "mongoose";

const cardSchema = new Schema({
  title: String,
  description: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
}, { timestamps: true });

const CardModel = models.cards || model("cards", cardSchema);

export default CardModel;