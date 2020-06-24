
import React, { useReducer } from 'react';
import axios from 'axios';
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
        id: 1,
        name: 'Jill jon',
        email: 'jon@gmail.com',
        phone: '123-232-222',
        type: 'personal',
      },
      {},
      {},
    ],
  };

  const [state,dispatch] = useReducer(contactReducer, initialState);
  // -----ACtions to be created below--------
  // Add Contact

  // Delete Contact

  // Set current Contact

  // clear current contact

  // we want to be able to update the contact

  // filter contacts

  // clear contact filter




  //let's return provider whichs allows me to wrap entire application with this context
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
       
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
    
    }; 

export default ContactState;