import express from "express";
import { shouldBeAdmin} from "../controllers/test.controller.js";
import { getAllPosts, getAllStats } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/stats", shouldBeAdmin, getAllStats);
router.get("/posts", shouldBeAdmin, getAllPosts);

export default router;
