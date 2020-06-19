import React, { Fragment, useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import  contactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem'
import Spinner from '../layout/Spinner'

const Contacts = () => {
    const context = useContext(contactContext)
    const { contacts, filtered, getContacts, loading } = context

    useEffect(() => {
        getContacts()
        // eslint-disable-next-line
    }, [context])

    if (contacts !== null && contacts.length === 0 && !loading) {
        return <h4>Please add a contact</h4>
    }


    return (
        <Fragment>
            {contacts !== null && !loading ? (
                <TransitionGroup>
                {
                    filtered === null ? (
                        contacts.map(contact => {
                            // _id is the MongoDB id
                            return <CSSTransition key = {contact._id} timeout= {500} classNames= "item">
                                        <ContactItem  contact = {contact}/> 
                                    </CSSTransition>
                            })
                    ) : (
                        filtered.map(contact => {
                            return <CSSTransition key = {contact._id} timeout= {500} classNames= "item">
                                        <ContactItem contact = {contact}/>
                                    </CSSTransition>
                            })
                    )

                }
                </TransitionGroup>
            ) : <Spinner />}
        </Fragment>
    )   

}

export default Contacts
