import Notes from '../models/notes.model';
import { client } from '../config/redis';
import { cli } from 'winston/lib/winston/config';
import User from '../models/user.model';

//create a new note
export const createNote = async (body) => {
  await client.del('getallNotes');
  const data = await Notes.create(body);
  return data;
};

//get all notes
export const getAllNotes = async (UserID) => {
  const data = await Notes.find({ UserID: UserID });
  await client.set('getAllNotes', JSON.stringify(data));
  return data;
};

//get a note by id
export const getNote = async (_id) => {
  const data = await Notes.findById({ _id: _id });
  await client.set('getNote', JSON.stringify(data));
  return data;
};

//update a note
export const updateNote = async (_id, body, UserID) => {
  await client.del('getallNotes');
  const data = await Notes.findByIdAndUpdate(
    {
      _id: _id, UserID: UserID
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete a Single note
export const deleteNote = async (_id, UserID) => {
  await Notes.findByIdAndDelete({ _id: _id, UserID: UserID });
  return '';
};

//archieve a note
export const archiveNote = async (_id, UserID) => {
  await client.del('getallNotes');
  const note = await Notes.findOne({ _id: _id, UserID: UserID });
  const isArchived = note.isArchived === false ? true : false;
  const data = await Notes.findByIdAndUpdate(
    {
      _id: _id, UserID: UserID
    },
    { isArchived: isArchived },
    {
      new: true
    }
  );
  return data;
};

//trash a note
export const trashNote = async (_id, UserID) => {
  await client.del('getallNotes');
  const note = await Notes.findOne({ _id: _id, UserID: UserID });
  const isDeleted = note.isDeleted === false ? true : false;
  const data = await Notes.findByIdAndUpdate(
    {
      _id: _id, UserID: UserID
    },
    { isDeleted: isDeleted },
    {
      new: true
    }
  );
  return data;
};

//pin a note
export const pinNote = async (_id, UserID) => {
  await client.del('getallNotes');
  const note = await Notes.findOne({ _id: _id, UserID: UserID });
  const pinned = note.pinned === false ? true : false;
  const data = await Notes.findByIdAndUpdate(
    {
      _id: _id, UserID: UserID
    },
    { pinned: pinned },
    {
      new: true
    }
  );
  return data;
};

//add collaborator to a note 
export const collaborateNote = async (_id, body) => {
  const Checkcollaborator = await User.find({ email: body.collaborator })
  console.log("collaborator is", Checkcollaborator)
  if (Checkcollaborator != null) {
    const data = await Notes.findOneAndUpdate(
      {
        _id: _id
      },
      {
        $addToSet: { collaborator: body.collaborator }
      },
      {
        new: true
      }
    );
    return data;
  }
  else {
    throw new Error("invaild email to collaborate");
  }
};
//delete Collaborator from a note
export const deleteCollaborator = async (_id, collaborator) => {
  const data = await Notes.findByIdAndUpdate({ _id: _id, collaborator: collaborator.email },
    { 
      $pull: { collaborator:collaborator } 
    },
    {
      new: true
    });
  return data;
}


