import { useSelector, useDispatch } from 'react-redux';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import { addContact, delContact } from '../redux/contacts/contacts-actions';
import { getFilteredContacts } from '../redux/contacts/contacts-selectors';

import css from './app.module.css';

const App = () => {
  const contacts = useSelector(getFilteredContacts);
  const dispatch = useDispatch();

  const regExpPattern = {
    name: new RegExp(
      "^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
    ),
    number: new RegExp(
      '\\+?\\d{1,4}?[ .\\-\\s]?\\(?\\d{1,3}?\\)?[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,9}'
    ),
  };

  const onSaveContact = ({ name, number }) => {
    // перевірка на коректність введених даних
    if (regExpPattern.name.test(name) && regExpPattern.number.test(number)) {
      // перевірка на наявність контакту по номеру
      if (!contacts.some(contact => contact.number === number)) {
        dispatch(addContact({ name, number }));
      } else {
        alert('Такий контакт вже існує');
        return;
      }
    } else {
      alert('Введені дані некоректні');
      return;
    }
  };

  const onDeleteContact = id => {
    dispatch(delContact(id));
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm onSaveContact={onSaveContact} />
      <h2>Contacts</h2>
      <Filter />
      <ContactList contactlist={contacts} onDeleteContact={onDeleteContact} />
    </div>
  );
};

export default App;
