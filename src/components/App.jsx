import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import { useSelector, useDispatch } from 'react-redux';
import { addContact, delContact, setFilter } from '../redux/actions';

import css from './app.module.css';
import { getAllContacts } from '../redux/contacts/contacts-selectors';
import { getFilteredContacts } from '../redux/contacts/contacts-selectors';

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

  const filterKey = key => {
    dispatch(setFilter(key));
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm onSaveContact={onSaveContact} />
      <h2>Contacts</h2>
      <Filter filterKey={filterKey} />
      <ContactList contactlist={contacts} onDeleteContact={onDeleteContact} />
    </div>
  );
};

export default App;
