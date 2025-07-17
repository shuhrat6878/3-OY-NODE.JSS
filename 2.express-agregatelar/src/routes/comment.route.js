import { Router } from "express";
import { CommentController } from "../controllers/comment.controller.js";

const router = Router();
const controller = new CommentController();

router
    .post('/', controller.createComment)
    .get('/', controller.getAllComments)
    .get('/video/:videoId', controller.getCommentsByVideo)
    .patch('/:id', controller.updateComment)
    .patch('/:id/like', controller.likeComment)
    .delete('/:id', controller.deleteComment)

export default router;
