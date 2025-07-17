import { Router } from "express";
import { VideoController } from "../controllers/video.controller.js";

const router = Router();
const controller = new VideoController();

router
    .post('/', controller.createVideo)
    .get('/', controller.getAllVideos)
    .get('/stats', controller.getVideoStatistics)
    .get('/categories', controller.getPopularCategories)
    .get('/:id', controller.getVideoById)
    .patch('/:id', controller.updateVideo)
    .patch('/:id/views', controller.incrementViews)
    .patch('/:id/like', controller.likeVideo)
    .delete('/:id', controller.deleteVideo)

export default router;
