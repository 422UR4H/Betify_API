import healthController from "controllers/health.controller";
import { Router } from "express";

const router = Router();

router.get('/health', healthController.get);

export default router;