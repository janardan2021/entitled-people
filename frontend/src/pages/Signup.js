import { useEffect, useState } from 'react';
import { useNavigate, useLocation} from "react-router-dom"
import {toast} from 'react-toastify'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import { useSignup } from '../hooks/useSignup';

const Signup = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [name, setName] = useState('')
    // const [show, setShow] = useState(false);
    const [show, setShow] = useState(true);
    const navigate = useNavigate()
    const location = useLocation()

    // looking for 'search' property of the location which contains query informations
    const {search} = useLocation()
    // The URLSearchParams interface defines utility methods to work with the query string of a URL.
    const sp = new URLSearchParams(search)
    // Returns the first value associated with the given search parameter.
    const redirect = sp.get('redirect') || '/'

    const {signup, data, isLoading, error} = useSignup()

    // VERY VERY IMPORTANT
    // use useEffect to do any logic if we get the data
    useEffect(() => {
      if (data) {
        toast.success('Sign up successful')
        navigate(redirect)
      }
      if(error) {
        toast.error('Something went wrong')
      }
    }, [data, navigate, redirect, error])

  
    // const handleShow = () => setShow(true);
    const submitHandler = async (e) => {
      e.preventDefault()
      await signup(email, password, name)
     }

    const handleClose = () => {
      setShow(false)
      navigate(redirect)
    }

    
    return (
      <>
       {isLoading ? 
       <Modal size="lg" show={show} backdrop="static" centered >
          <div className='themeColor rounded' >
          <Modal.Body>
            <div style={{textAlign: 'center'}}><h3>Signing up...</h3></div>
            <Spinner 
                  animation="border"
                  role="status"
                  style={{
                      width: '80px',
                      height: '80px',
                      margin: 'auto',
                      display: 'block'
                  }}>
            </Spinner>
            
          </Modal.Body>
          </div>
       </Modal>
        : 
        (
        <Modal size="lg" show={show} onHide={handleClose} backdrop="static" centered >
          <div className='themeColor rounded' >
          <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" >
                <Form.Label><strong>Name</strong></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your name"
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label><strong>Email address</strong></Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@email.com"
                  autoFocus
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label><strong>Password</strong></Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="success"type="submit">
                    Sign Up
                  </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
          {error && 
          <Modal.Body>
            <p style={{color: 'red'}}>{error}</p>
          </Modal.Body>
          }
          </div>
        </Modal>
        )}
      </>
    );
}

export default Signup
