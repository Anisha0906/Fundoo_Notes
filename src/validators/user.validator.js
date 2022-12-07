import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';


export const NewUserValidator = (req, res, next) => {
  const schema = Joi.object({
    firstname: Joi.string().min(3).required(),
    lastname: Joi.string().min(3).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required()
   
  });
  const { error} = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  } else {
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
  const { error} = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  } else {
    next();
  }
};
    
export const collaboratorValidator = (req, res, next) => {
  const schema = Joi.object({
    collaborator: Joi.string().email()
   //collaborator: Joi.string().pattern(new RegExp("/^([A-Za-z0-9._-]+{3,})@([A-Za-z0-9]+).([a-zA-Z])$/"))
  });
  const { error} = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  } else {
    next();
  }
};
