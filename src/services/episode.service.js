const Episode = require("../models/episode.model");

exports.getEpisode = async (search) => {
  let filter = {};

  if (search) {
    const isNumeric = !isNaN(search);

    filter = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { duration: { $regex: search, $options: "i" } },
        ...(isNumeric ? [{ episodeNum: Number(search) }] : []),
      ],
    };
  }

  return await Episode.find(filter).sort({ createdAt: -1 });
};

exports.getEpisodeById = async (id) => {
  return await Episode.findById(id);
};

exports.createEpisode = async (data) => {
  return await Episode.create(data);
};

exports.updateEpisode = async (id, data) => {
  return await Episode.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteEpisode = async (id) => {
  return await Episode.findByIdAndDelete(id);
};
