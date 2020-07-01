import React, { useReducer } from 'react';
import {v4 as uuidv4} from "uuid";
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: '1',
        name: 'james bond',
        email: 'aventure@gmail.com',
        phone: '514-242-2322',
        type: 'spy',
      },
      {
        id: '2',
        name: 'sonny',
        email: 'sony@hotmail.com',
        phone: '223-211-4242',
        type: 'fighter',
      },
      {
        id: '3',
        name: 'usuage',
        email: 'mary2@gmail.com',
        phone: '232-222-2222',
        type: 'lurker',
      },
    ],
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  const addContact = (contact) => {
    contact.id = uuidv4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  return (
    <ContactContext.Provider value={{ contacts: state.contacts,
    addContact }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
