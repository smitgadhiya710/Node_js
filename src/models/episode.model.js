const mongoose = require("mongoose");
const slugify = require("slugify");

// const roleModelSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   age: {
//     type: Number,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
// });

const episodeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    episodeNum: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      require: true,
    },
    // roleModels: {
    //   type: [roleModelSchema],
    //   required: true,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Episode", episodeSchema);
