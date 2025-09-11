const express = require("express");
const router = express.Router();
const podcastController = require("../controllers/podcast.controller");

router.get("/", podcastController.getPodcast);
router.post("/", podcastController.createPodcast);
router.get("/:slug", podcastController.getPodcastById);
router.put("/:slug", podcastController.updatePodcast);
router.delete("/:slug", podcastController.deletePodcast);
router.get("/aggerigate/language", podcastController.getPodcastByLanguage);

module.exports = router;
