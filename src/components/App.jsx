import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import { useSelector, useDispatch } from 'react-redux';
// import { useState, useEffect } from 'react';
// import { loadStorage, saveStorage } from './helpers/localeStorage';

import { addContact, delContact, setFilter } from '../redux/actions';

import css from './app.module.css';

// const KEY = 'contacts';

const App = () => {
  const contacts = useSelector(store => store.contacts);
  const filter = useSelector(store => store.filter);
  const dispatch = useDispatch();

  // const [contacts, setContacts] = useState([]);
  // const [filter, setFilter] = useState('');

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

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    } else {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter)
      );
    }
  };

  //on load page
  // useEffect(() => {
  //   const contactList = loadStorage(KEY);
  //   if (contactList) {
  //     setContacts(contactList);
  //   } else {
  //     setContacts([]);
  //   }
  // }, []);

  //on update state
  // useEffect(() => {
  //   saveStorage(KEY, contacts);
  // }, [contacts]);

  const filterKey = key => {
    dispatch(setFilter(key));
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm onSaveContact={onSaveContact} />
      <h2>Contacts</h2>
      <Filter filterKey={filterKey} />
      <ContactList
        contactlist={getFilteredContacts()}
        onDeleteContact={onDeleteContact}
      />
    </div>
  );
};

export default App;
