const { default: slugify } = require("slugify");
const episodeService = require("../services/episode.service");
const { successResponse } = require("../utils/response");
const { z } = require("zod");
const episodeModel = require("../models/episode.model");

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
    const episode = await episodeService.getEpisode(search);
    successResponse(res, episode, "Episodes fetched !!");
  } catch (error) {
    next(error);
  }
};

exports.getEpisodeById = async (req, res, next) => {
  try {
    const episode = await episodeService.getEpisodeById(req.params);
    successResponse(res, episode);
  } catch (error) {
    next(error);
  }
};

exports.createEpisode = async (req, res, next) => {
  try {
    const validate = episodeZodValidation.parse(req.body);

    let slug = createSlug(validate.title);

    let count = await episodeModel
      .find({
        $or: [
          {
            slug: {
              $regex: new RegExp(`^${slug}`),
            },
          },
          {
            slug: {
              $regex: new RegExp(`^${slug}(?:-\d+)?$`),
            },
          },
        ],
      })
      .countDocuments();

    if (count > 0) slug = `${slug}-${count}`;

    const podcast = await episodeService.createEpisode({ ...validate, slug });

    successResponse(res, podcast, "episode create successfully");
  } catch (error) {
    next(error);
  }
};

exports.updatedEpisode = async (req, res, next) => {
  try {
    const episode = await episodeService.updateEpisode(req.params, req.body);
    successResponse(res, episode, "Episode updated");
  } catch (error) {
    next(error);
  }
};

exports.deletedEpisode = async (req, res, next) => {
  try {
    await episodeService.deleteEpisode(req.params);
    successResponse(res, null, "Episode delete successfully");
  } catch (error) {
    next(error);
  }
};
