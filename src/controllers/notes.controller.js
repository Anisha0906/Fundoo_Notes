import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/notes.service';

/**
 * Controller to create a new note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const createNote = async (req, res, next) => {
    try {
      const data = await NoteService.createNote(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Note created successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
      });
      }
  };

  /**
 * Controller to get all notes 
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const  getAllNotes= async (req, res, next) => {
    try {
      const data = await NoteService.getAllNotes(req.body.UserID);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All notes fetched successfully'
      });
    } catch (error){
        next(error);
      }
    };
  /**
 * Controller to get a note by id
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getNote = async (req, res, next) => {
  try {
    const data = await NoteService.getNote(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'note fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Controller to update a note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const updateNote = async (req, res, next) => {
  try {
    const data = await NoteService.updateNote(req.params._id, req.body,req.body.UserID);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'note updated successfully'
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Controller to delete a note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteNote = async (req, res, next) => {
  try {
    await NoteService.deleteNote(req.params._id,req.body.UserID);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'note deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Controller to archieve a note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const archiveNote = async (req, res, next) => {
  try {
    const data = await NoteService.archiveNote(req.params._id,req.body.UserID);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'note archived successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to trash a note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const trashNote = async (req, res, next) => {
  try {
    const data = await NoteService.trashNote(req.params._id,req.body.UserID);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'note trashed successfully'
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Controller to pin a note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const pinNote = async (req, res, next) => {
  try {
    const data = await NoteService.pinNote(req.params._id,req.body.UserID);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'note pinned successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to collaborate a note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const collaborateNote = async (req, res, next) => {
  try {
    const data = await NoteService.collaborateNote(req.params._id,req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'note collaborated successfully'
    });
  } catch (error) {
    next(error);
  }
};

