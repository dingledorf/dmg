import type {Handler, Request, Response} from "express";
import {ApiError, validateRequest} from "utils/utils";
import {body, query} from 'express-validator';

const HardwareService = new (require('services/HardwareService'))();

export const createHardware: Handler = async (req: Request, res: Response) => {
  const validation = await validateRequest([
    body('name').isString(),
    body('location').isString(),
    body('hashRate').isNumeric()
  ], req);
  if(!validation.valid) {
    throw new ApiError(400, validation.errors);
  }

  const hardware = await HardwareService.create(req.body)
  return res.json(hardware);
}

export const updateHardware: Handler = async (req: Request, res: Response) => {
  const validation = await validateRequest([
    body('name').isString(),
    body('location').isString(),
    body('hashRate').isNumeric()
  ], req);
  if(!validation.valid) {
    throw new ApiError(400, validation.errors);
  }

  const hardware = await HardwareService.update(parseInt(req.params.id), req.body)
  return res.json(hardware);
}

export const findHardware: Handler = async (req: Request, res: Response) => {
  const hardware = await HardwareService.find(parseInt(req.params.id));
  return res.json(hardware);
}

export const getHardware: Handler = async (req: Request, res: Response) => {
  const validation = await validateRequest([
    query('page').optional().isInt({min: 1}),
    query('location').optional().isString(),
    query('name').optional().isString()
  ], req);
  if(!validation.valid) {
    throw new ApiError(400, validation.errors);
  }

  return res.json(await HardwareService.get(req.query))
}

export const deleteHardware: Handler = async (req: Request, res: Response) => {
  await HardwareService.delete(parseInt(req.params.id));
  return res.status(200).send();
}