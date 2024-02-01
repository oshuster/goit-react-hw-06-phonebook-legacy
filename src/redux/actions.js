import { nanoid } from 'nanoid';

import { ADD_CONTACT, DEL_CONTACT, SET_FILTER } from './constants';

const addContact = payload => {
  return {
    type: ADD_CONTACT,
    payload: {
      id: nanoid(),
      ...payload,
    },
  };
};

const delContact = payload => {
  return {
    type: DEL_CONTACT,
    payload,
  };
};

const setFilter = payload => {
  return {
    type: SET_FILTER,
    payload,
  };
};

export { addContact, delContact, setFilter };
