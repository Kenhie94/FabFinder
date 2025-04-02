import { Schema, model, models } from "mongoose";

const cardSchema = new Schema({
  cardId: String,
  title: String,
  description: String,
  image: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
}, { timestamps: true });

const CardModel = models.cards || model("cards", cardSchema);

export default CardModel;