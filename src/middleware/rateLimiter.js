import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,
  legacyHeaders: false,
  message: {
    message: 'Many login attempts, Try again in 10 minutes'
  }
})