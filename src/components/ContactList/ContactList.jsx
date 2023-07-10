import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ContactItem, DeleteBtn } from './ContactList.styled';
import { fetchContacts, deleteContact } from 'redux/contacts/operations';
import {
  selectContacts,
  selectError,
  selectIsLoading,
} from 'redux/contacts/selectors';
import { selectFilter } from 'redux/filter/selectors';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDelete = contactId => {
    dispatch(deleteContact(contactId));
  };

  const filterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // чтобы контакты вверху добавлялись
  const filteredContacts = filterContacts().reverse();

  return (
    <>
      {isLoading && !error && <div>Loading...</div>}
      {error && !isLoading && (
        <div>Sorry, something went wrong. Try again later</div>
      )}
      <ul>
        {filteredContacts.map(({ id, name, phone }) => {
          return (
            <ContactItem key={id}>
              <span>{name}: </span> <span>{phone}</span>{' '}
              <DeleteBtn
                onClick={() => {
                  handleDelete(id);
                }}
              >
                Delete
              </DeleteBtn>
            </ContactItem>
          );
        })}
      </ul>
    </>
  );
};
