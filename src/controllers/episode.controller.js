const episodeService = require("../services/episode.service");
const { successResponse } = require("../utils/response");

exports.getEpisode = async (req, res, next) => {
  try {
    const { search } = req.query;
    const episode = await episodeService.getEpisode(search);
    successResponse(res, episode, "Episodes fetched !!");
  } catch (error) {
    next(error);
  }
};

exports.getEpisodeById = async (req, res, next) => {
  try {
    const episode = await episodeService.getEpisodeById(req.params.id);
    successResponse(res, episode);
  } catch (error) {
    next(error);
  }
};

exports.createEpisode = async (req, res, next) => {
  try {
    const podcast = await episodeService.createEpisode(req.body);
    successResponse(res, podcast, "episode create successfully");
  } catch (error) {
    next(error);
  }
};

exports.updatedEpisode = async (req, res, next) => {
  try {
    const episode = await episodeService.updateEpisode(req.params.id, req.body);
    successResponse(res, episode, "Episode updated");
  } catch (error) {
    next(error);
  }
};

exports.deletedEpisode = async (req, res, next) => {
  try {
    await episodeService.deleteEpisode(req.params.id);
    successResponse(res, null, "Episode delete successfully");
  } catch (error) {
    next(error);
  }
};
