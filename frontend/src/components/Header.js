import { useNavigate, useLocation, Link} from "react-router-dom"
import { useState } from 'react';

import {Navbar, Container, Nav, Offcanvas} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {FaUser} from 'react-icons/fa'

// context
import { useUsersContext } from "../hooks/useUsersContext.js"
// hooks
import { useLogout } from "../hooks/useLogout"




const Header = () => {
     // `/register?redirect=${redirect}`
      const location = useLocation()
      // get the pathname of current window like: /first/second/third , where we want to
      // redirect after the user is succfully logged in
      // the location object has five properties
      const redirect = location.pathname
      
      // For user login and logout
      const {user} = useUsersContext()
      const {logout} = useLogout()

      const handleLogout = () => {
        logout()
          }

// Offcanvs
      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);    


      return (
        <>
        <Navbar expand="md" bg="dark" data-bs-theme="dark" className=''>
        <Container>
          <Navbar.Brand ><strong><Link style={{textDecoration: 'none', color: 'white'}} to={'/'}>Entitled-People</Link></strong></Navbar.Brand>
          
          <Navbar.Text className="navbarText me-auto">
            Share your experience
          </Navbar.Text>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          {/* Pass a location object to the 'to' variable */}
          {!user && <>
                   <LinkContainer to={{pathname: '/login',
                              search: `redirect=${redirect}`}}
                              style={{color:'white', marginRight: '15px'}}>
                       <Nav.Link ><FaUser/>Sign In</Nav.Link>
                   </LinkContainer> 
                   <LinkContainer to={{pathname: '/signup',
                              search: `redirect=${redirect}`}}
                              style={{color:'white'}}>
                       <Nav.Link > Sign Up</Nav.Link>
                   </LinkContainer> 
          </> }
           {user && <div style={{color:'white'}}>
                      <button onClick={handleShow} style={{color:'white',
                                      border: 'none', 
                                       background:'rgba(0,0,0,0)'
                                       }} >
                         <FaUser/>
                      </button>
                      <span> {user.name} </span>
                      <button style={{color:'white',
                                      border: 'none', 
                                       background:'rgba(0,0,0,0)',
                                       marginLeft: '15px'
                                       }} 
                              onClick={handleLogout}>Log out</button>
                    </div>}        
          {/* <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav> */}
          </Navbar.Collapse>
        </Container>
        </Navbar>

        {user && <Offcanvas className='text-bg-dark' show={show} onHide={handleClose} placement='end' >
        <Offcanvas.Header className="justify-content-between">
          <Offcanvas.Title>User Profile </Offcanvas.Title>
          <p>
          <button style={{border: 'none', 
                          background:'rgba(0,0,0,0)',
                          color: 'white'
                           }} 
                  onClick={handleClose}>Close</button>
          </p>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button style={{border: 'none', 
                          background:'rgba(0,0,0,0)',
                          color: 'white'
                           }} 
                  onClick={handleLogout}>Log out</button>
        </Offcanvas.Body>
        </Offcanvas>}
        </>
      )
    }

export default Header
