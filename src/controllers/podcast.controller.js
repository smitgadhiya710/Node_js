const podcastService = require("../services/podcast.service");
const { successResponse } = require("../utils/response");

exports.createPodcast = async (req, res, next) => {
  try {
    const podcast = await podcastService.createPodcast(req.body);
    successResponse(res, podcast, "podcast added sucessfully");
  } catch (err) {
    next(err);
  }
};

exports.getPodcast = async (req, res, next) => {
  try {
    const podcast = await podcastService.getPodcast();
    successResponse(res, podcast);
  } catch (err) {
    next(err);
  }
};

exports.getPodcastById = async (req, res, next) => {
  try {
    const podcast = await podcastService.getPodcastById(req.params.id);
    successResponse(res, podcast, "Podcast fetched !!");
  } catch (err) {
    next(err);
  }
};

exports.updatePodcast = async (req, res, next) => {
  try {
    const podcast = await podcastService.updatePodcast(req.params.id, req.body);
    successResponse(res, podcast, "Podcast updated");
  } catch (err) {
    next(err);
  }
};

exports.deletePodcast = async (req, res, next) => {
  try {
    await podcastService.deletePodcast(req.params.id);
    successResponse(res, null, "Podcast deleted successfully");
  } catch (err) {
    next(err);
  }
};
