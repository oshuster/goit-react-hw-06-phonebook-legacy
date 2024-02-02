import { ADD_CONTACT, DEL_CONTACT } from './contacts-constants';

const initialState = [];

const contactsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_CONTACT:
      return [...state, payload];
    case DEL_CONTACT:
      return state.filter(contact => contact.id !== payload);
    default:
      return state;
  }
};

export default contactsReducer;
