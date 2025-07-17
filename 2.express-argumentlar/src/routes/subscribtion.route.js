import { Router } from "express";
import { SubscriptionController } from "../controllers/subscription.controller.js";

const router = Router();
const controller = new SubscriptionController();

router
    .post('/', controller.subscribe)
    .get('/blogger', controller.getTopBloggers)
    .delete('/', controller.unsubscribe)
    .get('/followers/:Id', controller.getFollowers)
    .get('/following/:Id', controller.getFollowing)

export default router;
