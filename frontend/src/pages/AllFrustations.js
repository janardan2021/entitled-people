import { useEffect, useState } from "react"
import { Link, useNavigate, useLocation, redirect, useParams } from "react-router-dom"
import {toast} from 'react-toastify'

import { Button, Container, Row, Col , Form} from "react-bootstrap"

// Components
import FrustationDetails from "../components/FrustationDetails.js"
import Paginate from "../components/Paginate.js"
import Filter from '../components/Filter.js'

// hooks
import { useFrustationsContext } from "../hooks/useFrustationsContext.js"
import { useUsersContext } from "../hooks/useUsersContext.js"


const AllFrustations = () => {
    const {pageNumber} = useParams()
    console.log('pageNumber', pageNumber)
    
    const [page, setPage] = useState(null)
    const [pages, setPages] = useState(null)
    const [filter, setFilter] = useState(1)
    console.log('filterr', filter)

    const {user} = useUsersContext()
    // const [workouts, setWorkouts] = useState(null)
    const [place, setPlace] = useState('')
    const [incident, setIncident] = useState('')
    const [error, setError] = useState('')

    const location = useLocation()
    const redirect = location.pathname

    const {frustations, dispatch} = useFrustationsContext()

    const [validated, setValidated] = useState(false);

    useEffect(() => {
       const fetchFrustations = async () => {
            const response = await fetch(`/api/frustations?filter=${filter}`)
            if(response.ok) {
              // parse the body of the response which is a readable stream
             const json = await response.json()
            //  console.log(json)
            
                // setWorkouts(json)
                dispatch({type: 'SET_ALL_FRUSTATIONS', payload: json.frustations})
                setPage(json.page)
                setPages(json.pages)
            }
          }
       const fetchFrustationsByPage = async (pageNumber) => {
          const response = await fetch(`/api/frustations?pageNumber=${pageNumber}&filter=${filter}`)
          if(response.ok) {
            // parse the body of the response which is a readable stream
           const json = await response.json()
          //  console.log(json)
          
              // setWorkouts(json)
              dispatch({type: 'SET_ALL_FRUSTATIONS', payload: json.frustations})
              setPage(json.page)
              console.log('page', json.page)
              setPages(json.pages)
              console.log('pages', json.pages)
          }
         } 
          if (!pageNumber) fetchFrustations()
          if (pageNumber) fetchFrustationsByPage(pageNumber)
        
         }, [pageNumber, filter])
  
    const submitHandler = async (e) => {
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
      } else {
        setValidated(false);
        e.preventDefault();

        if(!user) {
          toast.info('Please log in')
        } else {
          const frustation = {title: place, comment: incident, user: user._id}

          const response = await fetch('/api/frustations', {
            method: 'POST', 
            // frustation into json string
            body: JSON.stringify(frustation),
            headers: {
              'Authorization': `Bearer ${user.token}`,
             'Content-Type': 'application/json'
            }    
         })
      const json = await response.json() 
      if(!response.ok) {
          setError(json.error)
       } else {
        if(response.ok) {
          setPlace('')
          setIncident('')
          setError(null)
          dispatch({type: 'CREATE_A_FRUSTATION', payload: json})
          }
         }
        }
      }
    }
    

    
  return (
   <div>
   <Container>

    <Row className='mt-0 mb-5'>
    
    {/* Frist column */}
    <Col sm={10} md={11} lg={7}>
      <Row className="mt-1 mb-1">
      <Filter changeFilter={setFilter}/>
      </Row>
      {frustations && frustations.map((frustation) => (
            <div key={frustation._id} className='my-3' >
            <Row>
                <FrustationDetails  frustation={frustation}/>
            </Row>  

            <Row  >
                <Col className="d-flex justify-content-end" >
                <Button variant="success" >
                  <Link className = "myLink" to={{pathname: `/frustations/${frustation._id}`,
                                                  search: `redirect=${redirect}`}}>View Reactions</Link>
                </Button>
                </Col>
            </Row>
            </div>
       ))}
    </Col>

  {/* Second column */}
   <Col sm={10} md={11} lg={5} className='my-2 p-2'>
      <h2><b>Share yours now</b></h2>
      <Form noValidate validated={validated}  onSubmit={submitHandler}>
        {error && <p style={{color: 'red'}}>{error}</p>}
      <Form.Group className="mb-3" >
        <Form.Label>Where was or who is this entitled person?</Form.Label>
        <Form.Control 
              type="text" 
              placeholder="workplace or store or train"
              value={place} 
              onChange={(e) => setPlace(e.target.value)}
              required/>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>      
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>What happened?</Form.Label>
        <Form.Control 
               as="textarea"
               rows="5"
               type="text" 
               placeholder="incident details"
               value={incident}
               onChange={(e) => setIncident(e.target.value)}
               required/>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>       
      </Form.Group>

      <div className="d-flex justify-content-end">
       <Button variant="success" type="submit" >
        Share experience
       </Button>
      </div>

      </Form>
    </Col>
      
    </Row>

    <Row className='mt-2 mb-0'>
      <Col md={{ span: 4, offset: 3 }} lg={{ span: 4, offset: 2 }}>
      
      {page && pages && <Paginate pages={pages} page={page}/> }
      </Col>
    </Row>

   </Container>
   </div>
  )
}




export default AllFrustations
