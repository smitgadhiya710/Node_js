const { getDataWithParams } = require("../helper/getDataWithParams");
const Episode = require("../models/episode.model");

exports.getEpisode = async (search, req) => {
  // let filter = {};

  // if (search) {
  //   const isNumeric = !isNaN(search);

  //   filter = {
  //     $or: [
  //       { title: { $regex: search, $options: "i" } },
  //       { description: { $regex: search, $options: "i" } },
  //       { duration: { $regex: search, $options: "i" } },
  //     ],
  //   };
  //   if (isNumeric) filter.$or.push({ episodeNum: Number(search) });
  // }

  // return await Episode.find(filter).sort({ createdAt: -1 });

  return await getDataWithParams(req, Episode);
};

exports.getEpisodeById = async (slug) => {
  return await Episode.findOne(slug);
};

exports.createEpisode = async (data) => {
  return await Episode.create(data);
};

exports.updateEpisode = async (slug, data) => {
  return await Episode.updateOne(slug, data, { new: true });
};

exports.deleteEpisode = async (slug) => {
  return await Episode.deleteOne(slug);
};
