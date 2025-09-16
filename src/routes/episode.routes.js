const express = require("express");
const router = express.Router();
const episodeController = require("../controllers/episode.controller");
const { caching } = require("../middlewares/caching.middleware");

router.get("/", caching.getCaching("allEpisode"), episodeController.getEpisode);
router.post("/", episodeController.createEpisode);
router.get(
  "/:slug",
  caching.getCaching("slugEpisode"),
  episodeController.getEpisodeById
);
router.put("/:slug", episodeController.updatedEpisode);
router.delete("/:slug", episodeController.deletedEpisode);

module.exports = router;
