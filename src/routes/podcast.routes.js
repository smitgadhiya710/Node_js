const express = require("express");
const router = express.Router();
const podcastController = require("../controllers/podcast.controller");

router.get("/", podcastController.getPodcast);
router.post("/", podcastController.createPodcast);
router.get("/:id", podcastController.getPodcastById);
router.put("/:id", podcastController.updatePodcast);
router.delete("/:id", podcastController.deletePodcast);

module.exports = router;
