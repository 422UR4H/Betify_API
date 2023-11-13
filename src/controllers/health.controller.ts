import { Request, Response } from "express";
import httpStatus from "http-status";
import healthService from "services/health.service";

function get(_req: Request, res: Response) {
    res.send(healthService.get()).status(httpStatus.OK);
}

const healthController = { get };
export default healthController;