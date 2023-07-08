import React from 'react';
import { useForm } from 'react-hook-form';
import { AddButton, PhonebookForm, ErrorText } from './Form.styled';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { addContact, getContacts } from 'redux/contacts/slice';

export const Form = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      number: '',
    },
    mode: 'onChange',
  });

  const onSubmit = values => {
    const hasContact = contacts.find(contact => values.name === contact.name);

    if (hasContact) {
      alert(`${values.name} is already in contacts`);

      return;
    }

    const newContact = {
      id: nanoid(),
      ...values,
    };

    dispatch(addContact(newContact));
  };

  return (
    <PhonebookForm
      onSubmit={handleSubmit(data => {
        onSubmit(data);
        reset();
      })}
    >
      <label htmlFor="name">
        <p>Name</p>
        <input
          {...register('name', {
            required: 'Name is required',
            pattern: {
              value:
                /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
              message: 'Name must contain only letters',
            },
          })}
          type="text"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        />
      </label>
      <ErrorText>{errors?.name?.message}</ErrorText>

      <label htmlFor="number">
        <p>Number</p>
        <input
          {...register('number', {
            required: 'Number is required',
            pattern: {
              value:
                /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}?$/,
              message: 'Invalid phone number',
            },
          })}
          type="tel"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        />
      </label>
      <ErrorText>{errors?.number?.message}</ErrorText>
      <AddButton type="submit" disabled={!isValid}>
        Add Contact
      </AddButton>
    </PhonebookForm>
  );
};
