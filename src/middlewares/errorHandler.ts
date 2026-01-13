import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('Error:', err);

  // Zod validation errors
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: 'Validation error',
      // @ts-ignore
      errors: err.errors.map((e: any) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
    return;
  }

  // Check for Prisma errors via code directly
  if (err.code === 'P2002' || err.code === 'P2025') {
    if (err.code === 'P2002') {
      res.status(409).json({
        success: false,
        message: 'Bu kayıt zaten mevcut',
      });
      return;
    }
    if (err.code === 'P2025') {
      res.status(404).json({
        success: false,
        message: 'Kayıt bulunamadı',
      });
      return;
    }
  }

  // AppError (custom errors)
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  // Default error
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'development' ? err.message : 'Sunucu hatası',
  });
};