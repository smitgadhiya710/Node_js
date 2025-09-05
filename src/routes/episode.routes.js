const express = require("express");
const router = express.Router();
const episodeController = require("../controllers/episode.controller");

router.get("/", episodeController.getEpisode);
router.post("/", episodeController.createEpisode);
router.get("/:slug", episodeController.getEpisodeById);
router.put("/:slug", episodeController.updatedEpisode);
router.delete("/:slug", episodeController.deletedEpisode);

module.exports = router;
