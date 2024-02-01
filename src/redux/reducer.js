import { ADD_CONTACT, DEL_CONTACT } from './constants';

const initialState = {
  contacts: [{ id: 'imId123', name: 'redux Contact', number: '0978653824' }],
  filter: '',
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, payload],
      };
    case DEL_CONTACT:
      const newContactsList = state.contacts.filter(
        contact => contact.id !== payload
      );
      return {
        ...state,
        contacts: newContactsList,
      };

    default:
      return state;
  }
};

export default reducer;
