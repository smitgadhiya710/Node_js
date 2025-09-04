const mongoose = require("mongoose");
const slugify = require("slugify");

const podcastSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

podcastSchema.pre("save", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true, trim: true });
  }
  next();
});

module.exports = mongoose.model("Podcast", podcastSchema);
