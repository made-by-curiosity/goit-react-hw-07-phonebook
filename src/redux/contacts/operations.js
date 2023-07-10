import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllContacts,
  deleteContactItem,
  addNewContact,
} from 'services/contactsAPI';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      return await getAllContacts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, thunkAPI) => {
    try {
      return await addNewContact(newContact);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      return await deleteContactItem(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
