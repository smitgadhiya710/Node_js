const express = require("express");
const router = express.Router();
const episodeController = require("../controllers/episode.controller");

router.get("/", episodeController.getEpisode);
router.post("/", episodeController.createEpisode);
router.get("/:id", episodeController.getEpisodeById);
router.put("/:id", episodeController.updatedEpisode);
router.delete("/:id", episodeController.deletedEpisode);

module.exports = router;
