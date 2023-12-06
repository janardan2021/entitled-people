// import { Link } from "react-router-dom"
import { Card , Button, Container, Row, Col} from "react-bootstrap"
import { FaThumbsUp, FaThumbsDown, FaTrash, FaEdit} from 'react-icons/fa';

import { useEffect } from "react";

import {formatDistanceToNow} from 'date-fns'

// hooks
import { useFrustationsContext } from "../hooks/useFrustationsContext"
import { useUsersContext } from "../hooks/useUsersContext.js"
// component
import EditFrustationDetails from "./EditFrustationDetails";
import { useState } from "react";

const FrustationDetails = ({frustation}) => {
   const [myFrustation, setMyFrustation] = useState(frustation)
   const [showEditForm, setShowEditForm] = useState(false)
    // To dispatch the delete action
    const {dispatch} = useFrustationsContext()
    const {user} = useUsersContext()

   // A function which will be passed as prop to the EditFrustationDetails component
   const updateEditedFrustation = (editedFrustation) => {setMyFrustation(editedFrustation)
                                                          setShowEditForm(false)}

    const handleDelete = async () => {
      // Delete frustation from the database
      const response = await fetch('/api/frustations/' + myFrustation._id, {
                        method: 'DELETE',
                        headers: {
                          'Authorization': `Bearer ${user.token}`
                        } 
                })
      
      const deletedFrustation = await response.json()
      
      if(response.ok) {
        // Remove frustation from the frustationsContext
         dispatch({type: 'DELETE_A_FRUSTATION', payload: deletedFrustation})
      }

      // Delete Reviews from the database
      const responseReviews = await fetch('/api/reviews/' + myFrustation._id, {
                                method: 'DELETE',
                                headers: {
                                  'Authorization': `Bearer ${user.token}`
                                } 
                                })

      setMyFrustation(null)                        

      // if(responseReviews.ok) {
      // // Remove frustation from the frustationsContext
      // dispatch({type: 'SET_ALL_REVIEWS', payload: {reviews: null}})
      // }

    }

    const handleEdit = async () => {
      setShowEditForm((showEditForm) => !showEditForm)
      // console.log(showEditForm)
    }

    useEffect(() => {
      setMyFrustation(frustation)
    }, [frustation, myFrustation])
  return (

  <div>
    {myFrustation && 
    <Card className='my-1 p-3 rounded '>
      <Card.Header className="themeColor p-2 rounded">
        <div className="d-flex justify-content-between">
            <div> <strong style={{color: 'dodgerBlue'}} >At/Who: </strong>{myFrustation.title}</div>
            <div><FaThumbsUp style={{color: 'green'}} /><strong> {myFrustation.likes}</strong></div>
            <div><FaThumbsDown style={{color: 'red'}}/><strong> {myFrustation.dislikes}</strong></div>
            <div> <strong style={{color: 'dodgerBlue'}} >Post by: </strong>{myFrustation.user.name}</div>
            <div>
            {/* <Button onClick={handleDelete} size="sm" variant="outline-success"><FaTrash style={{color: 'red'}}/></Button> */}
              {user && user._id === myFrustation.user._id && <Button onClick={handleDelete} size="sm" variant="outline-success"><FaTrash style={{color: 'red'}}/></Button>}
            </div>
            <div>
            {user && user._id === myFrustation.user._id && <Button onClick={handleEdit} size="sm" variant="outline-success"><FaEdit style={{color: 'red'}}/></Button>}
              </div>
            
        </div>
      </Card.Header>
      <Card.Body>
          <Card.Text className="themeColor p-2 rounded mx-1" >
          {myFrustation.comment}
          <br/>
          <b style={{color: 'green', marginBottom:'0px', fontSize:'12px'}}>
            {formatDistanceToNow(new Date(myFrustation.createdAt), {addSuffix: true})}
          </b>
          
          </Card.Text> 
          
      </Card.Body>
      {showEditForm && user && <Card.Body className="darkThemeColor p-1 rounded mx-3">
                                   <EditFrustationDetails frustation={ myFrustation} updateFrustation = {updateEditedFrustation}/>
                              </Card.Body>}
    </Card>}
    
  </div>
  )
}

export default FrustationDetails
