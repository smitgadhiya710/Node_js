const mongoose = require("mongoose");

const roleModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  category: {
    type: String,
    required: true,
  },
});

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
    // roleModels: {
    //   type: [roleModelSchema],
    //   required: true,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Episode", episodeSchema);
