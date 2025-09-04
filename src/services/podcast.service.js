const Podcast = require("../models/podcast.model");

exports.createPodcast = async (data) => {
  return await Podcast.create(data);
};

exports.getPodcast = async () => {
  return await Podcast.find();
};

exports.getPodcastById = async (id) => {
  return await Podcast.findById(id);
};

exports.updatePodcast = async (id, data) => {
  return await Podcast.findByIdAndUpdate(id, data, { new: true });
};

exports.deletePodcast = async (id) => {
  return await Podcast.findByIdAndDelete(id);
};
