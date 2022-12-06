import Joi from '@hapi/joi';

export const NewUserValidator = (req, res, next) => {
  const schema = Joi.object({
    firstname: Joi.string().min(3).required(),
    lastname: Joi.string().min(3).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required()
   
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

export const  NewNotesValidator = (req, res, next) => {
  const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  color: Joi.string().optional(),
  isArchived: Joi.string().optional(),
  isDeleted:Joi.string().optional(),
  UserID:Joi.string().optional(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
    
export const collaboratorValidator = (req, res, next) => {
  const schema = Joi.object({
    collaborator: Joi.string().email()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
};
