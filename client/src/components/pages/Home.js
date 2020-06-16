import React from 'react';
import Contacts from '../contacts/Contacts';
import Form from '../contacts/Form';
import ContactFilter from '../contacts/ContactFilter';

const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <Form />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
      <div>
        <Form />
      </div>
    </div>
  );
};

export default Home;
