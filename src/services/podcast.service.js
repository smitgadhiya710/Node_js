const Podcast = require("../models/podcast.model");

exports.createPodcast = async (data) => {
  return await Podcast.create(data);
};

exports.getPodcast = async () => {
  return await Podcast.find().sort({ createdAt: -1 });
};

exports.getPodcastById = async (slug) => {
  return await Podcast.findOne(slug);
};

exports.updatePodcast = async (slug, data) => {
  return await Podcast.updateOne(slug, data, { new: true });
};

exports.deletePodcast = async (slug) => {
  return await Podcast.deleteOne(slug);
};
