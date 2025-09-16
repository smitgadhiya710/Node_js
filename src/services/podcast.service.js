const { getDataWithParams } = require("../helper/getDataWithParams");
const podcastModel = require("../models/podcast.model");
const Podcast = require("../models/podcast.model");

exports.createPodcast = async (data) => {
  return await Podcast.create(data);
};

// exports.getPodcast = async () => {
//   return await Podcast.find().sort({ createdAt: -1 });
// };

exports.getPodcast = async (req) => {
  return await getDataWithParams(req, Podcast);
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

// filter value using aggregate

// exports.getPodcast = async (req) => {
//   const { sort, ...restPara } = req.query;
//   const sortQuery = { createdAt: -1 };
//   const array = [];

//   if (sort) {
//     sort.split(",").map((i) => {
//       const key = i.replace("-", "");
//       sortQuery[key] = i.includes("-") ? -1 : 1;
//     });
//   }

//   if (restPara) {
//     Object.entries(restPara).map(([key, value]) => {
//       value.split(",").forEach((val) => {
//         array.push({ [key]: val });
//       });
//     });
//   }

//   return await Podcast.aggregate([
//     {
//       $match: array.length > 1 ? { $or: array } : array[0],
//     },
//     {
//       $sort: sortQuery,
//     },
//   ]);
// };
