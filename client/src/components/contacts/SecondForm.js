import React, { useState, useContext, useEffect } from 'react';
import contactContext from '../../context/contact/contactContext';

const SecondForm = () => {
  const context = useContext(contactContext);
  const { current } = context;
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });
  const { name, email, phone, type } = contact;

  // We use the componentDidMount lifecycle method to  fill the form
  // fields when the edit button is clicked. In ContactItem.js we have
  // included functionality by which when the edit button is clicked, the
  // current state variable is set to the contact. In this file, we check
  // whether the current value is null or not on component mount, if not null
  // we set the state variables to current contact which when reflects in the form
  // as the name attribute of input is the state variables name, email, phone etc.
  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
  }, [current]);

  const onChange = (e) => {
    const { value, name } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!current) {
      context.addContact(contact);
    } else {
      context.updateContact(contact);
    }

    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
    });
  };

  const clearAll = () => {
    context.clearCurrent();
  };
  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current === null ? 'Add Job' : 'Edit Job'}
      </h2>
      <input
        type='text'
        name='name'
        value={name}
        placeholder='Company'
        onChange={onChange}
      />
      <input
        type='email'
        name='email'
        value={email}
        placeholder='Department'
        onChange={onChange}
      />
      <input
        type='text'
        name='phone'
        value={phone}
        placeholder='Phone'
        onChange={onChange}
      />
      <h5>Company type</h5>
      <input
        type='radio'
        name='type'
        value='public'
        checked={type === 'public'}
        onChange={onChange}
      />
      Public{' '}
      <input
        type='radio'
        name='type'
        value='private'
        checked={type === 'private'}
        onChange={onChange}
      />
      Private{' '}
      <input
        type='radio'
        name='type'
        value='None profit Organization'
        checked={type === 'None profit Organization'}
        onChange={onChange}
      />
      None profit Organization{' '}
      <div>
        <input
          type='submit'
          value={current === null ? 'Add Job' : 'Edit Job'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default SecondForm;
