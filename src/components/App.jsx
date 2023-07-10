import { Container } from './Container/Container';
import { Section } from './Section/Section';
import { Form } from 'components/Form/Form';
import { Filter } from './Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

export const App = () => {
  return (
    <Container titleText="Phonebook">
      <Section>
        <Form />
      </Section>
      <Section sectionTitle="Contacts">
        <Filter filterTitle="Find contacts by name" />
        <ContactList />
      </Section>
    </Container>
  );
};
