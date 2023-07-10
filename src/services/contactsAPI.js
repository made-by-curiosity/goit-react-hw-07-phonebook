import axios from 'axios';

const contacts = axios.create({
  baseURL: 'https://64abcc719edb4181202e8edb.mockapi.io/contacts',
});

export const getAllContacts = async () => {
  const res = await contacts.get();

  return res.data;
};

export const addNewContact = async newContact => {
  const res = await contacts.post('', newContact);

  return res.data;
};

export const deleteContactItem = async id => {
  const res = await contacts.delete(`/${id}`);

  return res.data;
};
