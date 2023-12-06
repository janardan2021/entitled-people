import { useParams, Link , useNavigate, useLocation} from "react-router-dom";
import { useEffect , useState, useReducer} from "react";
import {toast} from 'react-toastify'

import { Button, Container, Row, Col, Form } from "react-bootstrap";
// import { useNavigate, useLocation} from "react-router-dom"

// components
import ReviewDetails from "../components/ReviewDetails";
import FrustationDetails from "../components/FrustationDetails";

// context
import { useUsersContext } from "../hooks/useUsersContext.js"

// hooks
import { useFrustationsContext } from "../hooks/useFrustationsContext"
 const reviewsReducer = (state, action) => {
  switch (action.type) {
      case 'SET_ALL_REVIEWS':
         return {
          reviews: action.payload
         } 
      case 'CREATE_A_REVIEW' : 
         return {
          reviews: [action.payload, ...state.reviews]
         }  
      case 'DELETE_A_REVIEW':
          return {
            reviews: state.reviews.filter((f) => f._id !== action.payload._id)  
          }   
      default: 
         return state    
  }
}


const FrustationPage = () => {
  const navigate = useNavigate()
  const {id: frustationId} = useParams();

  const {user} = useUsersContext()
  const {frustations, dispatch: frustationDispatch} = useFrustationsContext()

  const {search} = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

 

var frustationFromContext;
 if (frustations) {
  frustationFromContext = frustations.filter((frustation) => frustation._id === frustationId)
 }

  const [frustation, setFrustation] = useState(frustationFromContext ? frustationFromContext[0] : null)
  
  // const [allReviews, setAllReviews] = useState(null)
  
  const [comment, setComment] = useState('')
  // const options = [1,2,3];
  const [isliked, setIsliked] = useState(1)
  const [error, setError] = useState('')
  const [selectError, setSelectError] = useState(true)

  // const {frustations} = useFrustationsContext()
  // const {getReviews, data, isLoading, error: loadingError} = useReviews()
  // const {getFrustation, isLoading: frustationLoading, error: frustationError, data: frustationData} = useFrustation()
  const [state, dispatch] = useReducer(reviewsReducer, {reviews: null})

  const [validated, setValidated] = useState(false);
 
   useEffect(() => {
    if (!frustations) {
      navigate('/')
    }

    const getFrustation= async () => {
      const response = await fetch('/api/frustations/' + frustationId)
      const json = await response.json()
      if (response.ok && json) {
        setFrustation((frustation) => json)
    }
    }

    const getReviews= async () => {
      const response = await fetch('/api/reviews/' + frustationId)
      const json = await response.json()
      console.log(json)
      if(!response.ok) {
        // console.log(json.error)
      }
      if (response.ok  && json[0]) {
        // setAllReviews(json[0].reviewer)
        dispatch({type: 'SET_ALL_REVIEWS', payload: json[0].reviewer.reverse()})
        // console.log(json[0].reviewer)
    }
    }

    // console.log(state.reviews.length)
    if (!state.reviews){
      getReviews()
    }  
    if(!frustation) {
      getFrustation()
    }

    }, [frustationId, state.reviews, frustations, user, navigate, frustation])

 const submitReview = async (e) => {
  const form = e.currentTarget;
  if (form.checkValidity() === false) {
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);
  } else {
    setValidated(false);
    e.preventDefault();

       if (!user) {
        toast.info('Please log in')
       } else {
        const review = {user: user._id, name: user.name, isliked, comment }

        const response = await fetch('/api/reviews/' + frustationId , {
            method: 'POST', 
            // frustation into json string
            body: JSON.stringify(review),
            headers: {
              'Authorization': `Bearer ${user.token}`,
             'Content-Type': 'application/json'
            }    
         })
        const json = await response.json()
        console.log(json)
  
        if(!response.ok) {
          setError(json.error)
        }
       if(response.ok) {
        console.log(frustation)
        var updateLikes = frustation.likes
        var updateDislikes = frustation.dislikes
        console.log('type of Number(isliked)',typeof Number(isliked))
          if (Number(isliked) === 1) {
            console.log('if statement', isliked)
            updateLikes = updateLikes + 1
          }else {
            console.log('else statement', isliked)
            updateDislikes = updateDislikes + 1
          }
          const updatedFrustation = {...frustation, likes: updateLikes, dislikes: updateDislikes}
          console.log(updatedFrustation)
          // Update reviews on the page
          console.log(json)
          console.log(json.reviewer)
           dispatch({type: 'SET_ALL_REVIEWS', payload: json?.reviewer?.reverse()})
          //  update frustations in the frustation context
           frustationDispatch({type: 'UPDATE_A_FRUSTATION', payload: updatedFrustation})
          //  update frustation on this FrustationPage
           setFrustation(updatedFrustation)
          console.log('This is line is being exeuted')
           
           setIsliked(2)
           setComment('')
           setError(null)
           setSelectError(true)
       }
            
       }
  }
    }


  return (
      <div>
        {frustation && 
            <Container>
              <Row>
                <Col sm={10} lg={7}> 
                <FrustationDetails frustation={frustation}/>
                </Col>
              </Row>
              <Row>
                <Col sm={10} lg={8} className='mt-2'>
                <Button variant="success"> <Link className="myLink" to={redirect}>Go back</Link> </Button>
                </Col>
              </Row>
            </Container>
          }          
          
          
            <Container>
              <Row className='my-2 p-2 rounded'>
              <Col sm={10} md={10} lg={5}>

              <h2><b>Leave your comment</b></h2>

              <Form noValidate validated={validated}  onSubmit={submitReview}>

                  <Form.Group className="mb-3" >
                      {error && <p style={{color:'red'}}><strong>{error}</strong></p>}
                      <Form.Label>Do yo support the owner's post?</Form.Label>
                      <Form.Select type='number' onChange={(e) => {
                                                             setIsliked(e.target.value)
                                                             if (Number(e.target.value) === 2) {
                                                                setSelectError(true)
                                                             }else {
                                                              setSelectError(false)
                                                             }
                                                            }}
                                   defaultValue={2}
                                   required>
                                  <option  value={2} key={2}>{'Please choose one...'}</option>
                                  <option  value={1} key={1}>{'I like it'}</option>
                                  <option  value={0} key={0}>{'I do not like it'}</option>
                          {/* {options.map((option) => (
                              <option value={option} key={option}>{option ? 'Yes' : 'No'}</option>
                            ))} */}
                      </Form.Select>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>  
                  </Form.Group>

                  <Form.Group className="mb-3" >
                    <Form.Label>What do you say about this entitled person?</Form.Label>
                    <Form.Control 
                          as="textarea"
                          rows="5"
                          type="text" 
                          placeholder="Your thoughts here"
                          value={comment} 
                          onChange={(e) => setComment(e.target.value)}
                          required/>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>        
                  </Form.Group>
                  

                  <div className="d-flex justify-content-end">
                  <Button variant="success" type="submit" disabled={(user && selectError)} >
                    Share thoughts
                  </Button>
                  </div>
                  

            </Form>
              </Col>
              
             <Col sm={10} md={10} lg={7} > 
              { state.reviews ? state.reviews.map((reviewer) => (
            
                  <ReviewDetails key={reviewer._id} reviewer={reviewer}/>
                )) 
              : <></>}
              </Col>
              
             
              </Row>
             
            </Container>
        </div>
      
  )
}



export default FrustationPage
