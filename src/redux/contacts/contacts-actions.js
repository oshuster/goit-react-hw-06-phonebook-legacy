import { nanoid } from 'nanoid';

import { ADD_CONTACT, DEL_CONTACT } from './contacts-constants';

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

export { addContact, delContact };
