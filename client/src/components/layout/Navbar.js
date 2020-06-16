import React, { Fragment, useContext, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import ContactContext from '../../context/contact/contactContext'

const Navbar = ({ title, icon }) => {
    const authContext = useContext(AuthContext)
    const contactContext = useContext(ContactContext)
    const { isAuthenticated, logout, user, loadUser } = authContext
    const { clearContacts } = contactContext

    useEffect(() => {
        loadUser()
        //eslint-disable-next-line
    }, [])
    const onLogout = () =>{
        logout()   
        // When we logout and then try to login we see the previous user
        //contacts for a sec. To avoid this we clear the contacts after
        // logging out
        clearContacts()
    } 
    
    const authLinks = (
        <Fragment>
            <li>Hello { user && user.name }</li>
            <li>
                <a onClick = {onLogout} href= "#!">
                    <i className= "fas fa-sign-out-alt"></i><span className= "hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <li><Link to ="/register">Register</Link></li>
            <li><Link to ="/login">Login</Link></li>
        </Fragment>
    )

    return (
        <div className= "navbar bg-primary">
            <h1>
                <i className={icon} /> {title}               
            </h1>
            <ul>
                { isAuthenticated ? authLinks : guestLinks }
            </ul>
        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}

Navbar.defaultProps = {
    title: 'Contact Keeper',
    icon: "fas fa-id-card-alt"
}

export default Navbar
