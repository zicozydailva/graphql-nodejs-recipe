import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdAt: String,
  thumpsUp: Number,
  thumpsDown: Number,
});

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
