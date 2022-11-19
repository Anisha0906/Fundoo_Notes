import Notes from '../models/notes.model';

//create a new note
export const createNote = async (body) => {
    const data = await Notes.create(body);
    return data;
  };
  
  //get all notes
  export const getAllNotes = async (UserID) => {
    const data = await Notes.find({UserID:UserID});
    return data;
  };

  //get a note by id
export const getNote = async (id) => {
  const data = await Notes.findById({id:id});
  return data;
};

//update a note
export const updateNote = async (_id, body,UserID) => {
  const data = await Notes.findByIdAndUpdate(
    {
      _id:_id,UserID:UserID
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete a Single note
export const deleteNote = async (id,UserID) => {
  await Notes.findByIdAndDelete({id:id,UserID:UserID});
  return '';
};

//archieve a note
export const archiveNote = async (_id,UserID) => {
  const note = await Notes.findOne({ _id: _id,UserID:UserID });
  const isArchived = note.isArchived === false ? true : false;
  const data = await Notes.findByIdAndUpdate(
    {
      _id:_id,UserID:UserID
    },
    { isArchived: isArchived },
    {
      new: true
    }
  );
  return data;
};

//trash a note
export const trashNote = async (_id,UserID) => {
  const note = await Notes.findOne({ _id: _id,UserID:UserID });
  const  isDeleted = note. isDeleted === false ? true : false;
  const data = await Notes.findByIdAndUpdate(
    {
      _id:_id,UserID:UserID
    },
    {  isDeleted: isDeleted},
    {
      new: true
    }
  );
  return data;
};



