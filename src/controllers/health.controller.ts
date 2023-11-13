import { Request, Response } from "express";
import httpStatus from "http-status";
import healthService from "services/health.service";

function get(_req: Request, res: Response) {
    const result = healthService.get();
    res.send(result).status(httpStatus.OK);
}

const healthController = { get };
export default healthController;