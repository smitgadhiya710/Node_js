const { default: slugify } = require("slugify");
const podcastService = require("../services/podcast.service");
const { successResponse } = require("../utils/response");
const { z } = require("zod");
const podcastModel = require("../models/podcast.model");
const { createSlug } = require("../helper/createSlug");

const podcastZodValidation = z.object({
  title: z.string(),
  category: z.string(),
  language: z.string(),
  author: z.string(),
  releaseDate: z.string(),
  description: z.string().optional(),
});

exports.createPodcast = async (req, res, next) => {
  try {
    const validate = podcastZodValidation.parse(req.body);

    let slug = createSlug(validate.title);

    const count = await podcastModel
      .find({
        $or: [
          {
            slug: { $regex: new RegExp(`^${slug}`) },
          },
          {
            slug: { $regex: new RegExp(`^${slug}(?:-\d+)?$`) },
          },
        ],
      })
      .countDocuments();

    if (count > 0) slug = `${slug}-${count}`;

    const podcast = await podcastService.createPodcast({ ...validate, slug });
    successResponse(res, podcast, "podcast added sucessfully", 201);
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
    const podcast = await podcastService.getPodcastById(req.params);
    successResponse(res, podcast, "Podcast fetched !!");
  } catch (err) {
    next(err);
  }
};

exports.updatePodcast = async (req, res, next) => {
  try {
    const podcast = await podcastService.updatePodcast(req.params, req.body);
    successResponse(res, podcast, "Podcast updated");
  } catch (err) {
    next(err);
  }
};

exports.deletePodcast = async (req, res, next) => {
  try {
    await podcastService.deletePodcast(req.params);
    successResponse(res, null, "Podcast deleted successfully");
  } catch (err) {
    next(err);
  }
};
