import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';

import { v4 as uuidv4 } from 'uuid';
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
    curent:null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);
  // -----ACtions to be created below--------
  // Add Contact  ultimately connects to API

  const addContact = (contact) => {
    contact.id = uuidv4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // Delete Contact

  const deleteContact = (id) => {
  
    dispatch({ type: DELETE_CONTACT, payload: id });
  };


  // Set current Contact



  const setCurrent = contact =>{

    dispatch({ type: SET_CURRENT, payload:contact});
  };
  // clear current contact
  const clearCurrent = () =>{

    dispatch({ type: CLEAR_CURRENT});
  };
  // we want to be able to update the contact
const updateContact =(contact) => {
  dispatch({type: UPDATE_CONTACT, payload :contact})
}
  // filter contacts
const filterContacts =text=>{
  dispatch({type:FILTER_CONTACTS, payload :text});
}
  // clear contact filter

const clearFilter =()=> {
  dispatch ({ type:CLEAR_FILTER});
}

  //let's return provider whichs allows me to wrap entire application with this context
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current, 
        filtered: state.filtered,
        addContact,
        deleteContact,
        clearCurrent,
        setCurrent,
        filterContacts,
        clearFilter,
        updateContact,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
