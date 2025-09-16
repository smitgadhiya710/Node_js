const { default: slugify } = require("slugify");
const episodeService = require("../services/episode.service");
const { successResponse, errorResponse } = require("../utils/response");
const { z } = require("zod");
const episodeModel = require("../models/episode.model");
const { slug } = require("../helper/slug");
const { caching } = require("../middlewares/caching.middleware");

const episodeZodValidation = z.object({
  title: z.string(),
  description: z.string().optional(),
  episodeNum: z.number(),
  duration: z.string().optional(),
  releaseDate: z.string(),
});

exports.getEpisode = async (req, res, next) => {
  try {
    const { search } = req.query;
    const episode = await episodeService.getEpisode(search, req);
    caching.setCaching(`allEpisode-${req.url}`, episode);
    successResponse({
      res,
      data: episode,
      message: "Episodes fetched !!",
      status: 200,
    });
  } catch (error) {
    // next(error);
    errorResponse({ res, error, message: "Something went wrong", status: 500 });
  }
};

exports.getEpisodeById = async (req, res, next) => {
  try {
    const episode = await episodeService.getEpisodeById(req.params);
    caching.setCaching(`slugEpisode-/${req.params.slug}`, episode);
    successResponse({
      res,
      data: episode,
      message: "Episode Fetched",
      status: 200,
    });
  } catch (error) {
    // next(error);
    errorResponse({ res, error, message: "Something went wrong", status: 500 });
  }
};

exports.createEpisode = async (req, res, next) => {
  try {
    const validate = episodeZodValidation.parse(req.body);

    const generatedSlug = await slug.createSlug(validate.title, episodeModel);

    const podcast = await episodeService.createEpisode({
      ...validate,
      slug: generatedSlug,
    });

    successResponse({
      res,
      data: podcast,
      message: "episode create successfully",
      status: 201,
    });
  } catch (error) {
    // next(error);
    errorResponse({ res, error, message: "Something went wrong", status: 500 });
  }
};

exports.updatedEpisode = async (req, res, next) => {
  try {
    const validate = episodeZodValidation.parse(req.body);

    const generatedSlug = await slug.createSlug(validate.title, episodeModel);

    const episode = await episodeService.updateEpisode(req.params, {
      ...req.body,
      slug: generatedSlug,
    });
    successResponse({
      res,
      data: episode,
      message: "Episode updated",
      status: 201,
    });
  } catch (error) {
    // next(error);
    errorResponse({ res, error, message: "Something went wrong", status: 500 });
  }
};

exports.deletedEpisode = async (req, res, next) => {
  try {
    await episodeService.deleteEpisode(req.params);
    successResponse({
      res,
      data: null,
      message: "Episode delete successfully",
    });
  } catch (error) {
    // next(error);
    errorResponse({ res, error, message: "Something went wrong", status: 500 });
  }
};
