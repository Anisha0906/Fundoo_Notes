import express from 'express';
import * as notesController from '../controllers/notes.controller';
import  {userAuth}  from '../middlewares/auth.middleware';
import {  NewNotesValidator} from '../validators/user.validator';
import { redisCheck,redisGetSingle } from '../middlewares/redis.middleware';


const router = express.Router();
//router to create a note
router.post('',NewNotesValidator,userAuth, notesController.createNote);

//router to get all notes
router.get('',userAuth ,redisCheck,notesController.getAllNotes);

//router to get a note by id
router.get('/:_id', userAuth,redisGetSingle, notesController.getNote);

//route to update a note
router.put('/:_id', userAuth, notesController.updateNote);

//route to delete a note
router.delete('/:_id', userAuth, notesController.deleteNote);

//route to archieve a note
router.put('/:_id/archive', userAuth, notesController.archiveNote);

//route to trash a note
router.put('/:_id/trash', userAuth, notesController.trashNote);

//route to pin a note
router.put('/:_id/pin', userAuth, notesController.pinNote);

export default router;