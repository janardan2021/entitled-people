import { useState } from "react"

import { Button, Form} from "react-bootstrap"
// hooks
import { useFrustationsContext } from "../hooks/useFrustationsContext"
import { useUsersContext } from "../hooks/useUsersContext.js"

const EditFrustationDetails = ({frustation, updateFrustation}) => {

    const {user} = useUsersContext()
    const [place, setPlace] = useState(frustation.title)
    const [incident, setIncident] = useState(frustation.comment)

    const [error, setError] = useState('')

    const {dispatch} = useFrustationsContext()

    const submitFrustation = async (e) => {
        e.preventDefault()
        console.log(frustation)

        // dispatch({type: 'DELETE_A_FRUSTATION', payload: json})
        
        const newFrustation = {title: place, comment: incident, user: user._id}

        const response = await fetch('/api/frustations/' + frustation._id, {
          method: 'PATCH', 
          // frustation into json string
          body: JSON.stringify(newFrustation),
          headers: {
            'Authorization': `Bearer ${user.token}`,
           'Content-Type': 'application/json'
          }    
       })
      const json = await response.json()

      if(!response.ok) {
        setError(json.error)
     }
     if(response.ok) {
         setPlace(place)
         setIncident(incident)
         setError(null)
         console.log('New experience added', json)
         dispatch({type: 'UPDATE_A_FRUSTATION', payload: json})
         updateFrustation(json)
     }
          

    }

  return (
    <div>
    {user && 
        <div>
          {error && <p style={{color: 'red'}}>{error}</p>}
        <Form onSubmit={submitFrustation}>
         <Form.Group className="mb-2" >
           <Form.Label>Where was or who is this entitled person?</Form.Label>
           <Form.Control 
                 type="text" 
                 placeholder="workplace or store or train"
                 value={place} 
                 onChange={(e) => setPlace(e.target.value)}/>
         </Form.Group>
         <Form.Group className="mb-2" >
           <Form.Label>What happened?</Form.Label>
           <Form.Control 
                  as="textarea"
                  rows="5"
                  type="text" 
                  placeholder="incident details"
                  value={incident}
                  onChange={(e) => setIncident(e.target.value)} />
         </Form.Group>
   
         <div className="d-flex justify-content-end">
          <Button variant="success" type="submit" >
           Edit experience
          </Button>
         </div>
   
       </Form>
         
       </div>}
       </div>
  )
}

export default EditFrustationDetails
