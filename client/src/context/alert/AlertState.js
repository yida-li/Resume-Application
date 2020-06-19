import React, { useReducer } from 'react';

import alertReducer from './alertReducer';
import AlertContext from './alertContext';
import { v4 as uuid } from 'uuid';
import { REMOVE_ALERT, SET_ALERT } from '../Types';

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set alert
  const setAlert = (msg, type, timeout = 10000) => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
