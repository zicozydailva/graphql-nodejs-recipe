import Recipe from "../models/Recipe.js";

export default {
  Query: {
    async recipe(_, { ID }) {
      return await Recipe.findById(ID);
    },
    async getRecipes(_, { amount }) {
      return await Recipe.find().sort({ createdAt: -1 }).limit(amount);
    },
  },
  Mutation: {
    async createRecipe(_, { recipeInput: { name, description } }) {
      const createdRecipe = new Recipe({
        name,
        description,
        createdAt: new Date().toISOString(),
        thumpsUp: 0,
        thumpsDown: 0,
      });
      const res = await createdRecipe.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },

    async deleteRecipe(_, { ID }) {
      const wasDeleted = (await Recipe.deleteOne({ _id: ID })).deletedCount;
      //   the above code returns 1 if something was deleted, 0 if nothing was deleted
      return wasDeleted;
    },

    async editRecipe(_, { ID, recipeInput: { name, description } }) {
      const wasEdited = await Recipe.updateOne(
        { _id: ID },
        { name, description }
      );
      return wasEdited
    },
  },
};
