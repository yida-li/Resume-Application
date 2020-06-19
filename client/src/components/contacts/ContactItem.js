import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import contactContext from '../../context/contact/contactContext'

const ContactItem = ({ contact }) => {
    const { _id, name, email, phone, type } = contact
    const context = useContext(contactContext)

    const onDelete = () => {
        context.deleteContact(_id)
        // Delete the contact and also set current state value to null.
        context.clearCurrent()
    }
    return (
        <div className = "card bg-light">
            <h3 className = "text-primary text-left">
                {name}{' '} 
                <span style = {{ float: "right" }} className= {'badge ' + (type === 'personal' ? 'badge-primary' : 'badge-success')}>
                    {type.charAt(0).toUpperCase() + type.slice(1,type.length)}
                </span>
            </h3>
            <ul className = "list">
                { email && (
                    <li>
                        <i className = "fas fa-envelope-open"></i> {email}
                    </li>
                )}
                { phone && (
                    <li>
                        <i className = "fas fa-phone"></i> {phone}
                    </li>
                )}
            </ul>
            <p>
                <button className = "btn btn-dark btn-sm" onClick = {() => context.setCurrent(contact)}>Edit</button>
                <button className = "btn btn-danger btn-sm" onClick= {onDelete}>Delete</button>
            </p>
        </div>
    )
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
}
export default ContactItem