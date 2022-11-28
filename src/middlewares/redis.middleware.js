import { client } from '../config/redis';

export const redisCheck = async (req, res, next) => {

const value = await client.get('getAllNotes');
    if (value!== null) {
      res.status(200).json({
        code: 200,
        data: JSON.parse(value),    
        message: 'All notes fetched from redis successfully'
      });
    } else {
      next();
    }
  } 

  export const redisGetSingle = async (req, res, next) => {
    const value = await client.get('getNote');
        if (value!= null) {
          res.status(200).json({
            code: 200,
            data: JSON.parse(value),
            message: 'note fetched from redis successfully'
          });
        } else {
          next();
        }
      } 
