import joi from "joi";

const joiUserSchema = joi.object({
  name: joi.string(),
  password: joi.string().min(4).required(),
  email: joi.string().email().required(),
  mobile: joi.string().optional(),
  isBlocked: joi.boolean().default(false).optional(),
  profile:joi.optional(),
  role: joi.string().default("User").optional(),
  refreshToken: joi.string().optional(),
});

const joiProductSchema = joi.object({
  name: joi.string().required(),
  rating: joi.number().required().min(1).max(5),
  price: joi.number().required(),
  description: joi.string().optional(),
  original: joi.boolean().optional().default(false),
  category: joi.string().required(),
  review: joi.string().optional(),
});

export { joiProductSchema, joiUserSchema };
