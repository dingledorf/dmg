import {ValidationChain, validationResult} from "express-validator";
import type {Request} from 'express';

export class ApiError extends Error {
  readonly status: number;
  readonly inner: any;
  constructor(status: number, body?: any) {
    super();
    this.status = status;
    this.inner = body;
  };
}

export const validateRequest = async (validations: ValidationChain[], req: Request) => {
  await Promise.all(
    validations.map((validation) => validation.run(req as Request)),
  );

  const errors = validationResult(req as Request);

  return {
    valid: errors.isEmpty(),
    errors
  }
}