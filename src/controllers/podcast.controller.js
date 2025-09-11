const podcastService = require("../services/podcast.service");
const { successResponse, errorResponse } = require("../utils/response");
const { z } = require("zod");
const podcastModel = require("../models/podcast.model");
const { slug } = require("../helper/slug");

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

    const generatedSlug = await slug.createSlug(validate.title, podcastModel);

    const podcast = await podcastService.createPodcast({
      ...validate,
      slug: generatedSlug,
    });
    successResponse({
      res,
      data: podcast,
      message: "podcast added sucessfully",
      status: 201,
    });
  } catch (error) {
    // next(error);
    errorResponse({ res, error, message: "Something went wrong", status: 500 });
  }
};

exports.getPodcast = async (req, res, next) => {
  try {
    const podcast = await podcastService.getPodcast(req);
    successResponse({
      res,
      data: podcast,
      message: "podcast fetched ",
      status: 200,
    });
  } catch (error) {
    // next(error);
    errorResponse({
      res,
      error,
      message: "Something went wrong",
      status: 500,
    });
  }
};

exports.getPodcastById = async (req, res, next) => {
  try {
    const podcast = await podcastService.getPodcastById(req.params);
    successResponse({
      res,
      data: podcast,
      message: "Podcast fetched !!",
      status: 200,
    });
  } catch (error) {
    // next(error);
    errorResponse({
      res,
      error,
      message: "Something went wrong",
      status: 500,
    });
  }
};

exports.updatePodcast = async (req, res, next) => {
  try {
    const validate = podcastZodValidation.parse(req.body);

    const generatedSlug = await slug.createSlug(validate.title, podcastModel);

    const podcast = await podcastService.updatePodcast(req.params, {
      ...req.body,
      slug: generatedSlug,
    });
    successResponse({
      res,
      data: podcast,
      message: "Podcast updated",
      status: 200,
    });
  } catch (error) {
    // next(error);
    errorResponse({
      res,
      error,
      message: "Something went wrong",
      status: 500,
    });
  }
};

exports.deletePodcast = async (req, res, next) => {
  try {
    await podcastService.deletePodcast(req.params);
    successResponse({
      res,
      data: null,
      message: "Podcast deleted successfully",
    });
  } catch (error) {
    // next(error);
    errorResponse({
      res,
      error,
      message: "Something went wrong",
      status: 500,
    });
  }
};

exports.getPodcastByLanguage = async (req, res) => {
  try {
    const getData = await podcastModel.aggregate([
      {
        $group: {
          _id: "$language",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          language: "$_id",
          count: 1,
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    successResponse({
      res,
      data: getData,
      message: "fetchedd",
      status: 200,
    });
  } catch (error) {
    errorResponse({ res, error, message: "something went wrong", status: 500 });
  }
};
