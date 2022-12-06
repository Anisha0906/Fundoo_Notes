import { bool, boolean, string } from '@hapi/joi';
import { Schema, model } from 'mongoose';
const mongoose = require("mongoose");

const notesSchema = new Schema(
    {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      color: {
        type: String
      },
      isArchived: {
        type: Boolean,
        default: false
      },
      isDeleted: {
        type: Boolean,  
        default:false
      },
      UserID:{
        type: String
      },
      pinned: {
        type: Boolean,
        default: false
    },
    collaborator: [{
      type:String
  }],
  },
    {
      timestamps: true
    }
  );
  
  export default model('Notes', notesSchema);