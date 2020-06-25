import React, { useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
import { Fragment } from 'react';
import ContactItem from './ContactItem';

export const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts } = contactContext;

  return (
    <Fragment>
      {contacts.map((contact) => (
        <ContactItem  key ={ contact.id} contact= {contact }></ContactItem>
      ))}
    </Fragment>
  );
};
export default Contacts;
