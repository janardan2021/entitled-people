import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FloatingLabel } from "react-bootstrap";

const Filter = ({changeFilter}) => {
    const navigate = useNavigate()
    const [filter, setFilter] = useState(1)
    const submitFilter = async (e) => {
        e.preventDefault()
        changeFilter(filter)
    }
  return (
    <div>
       <Form onSubmit={submitFilter} >

        <Form.Group className="d-flex" >
        {/* <FloatingLabel  label="Works with selects"> */}
            <Form.Select type='number' onChange={(e) => setFilter(Number(e.target.value))}>
                        <option  value={1} key={1}>Filter - Newly posted</option>
                        <option  value={2} key={2}>Filter - Most liked</option>
                        <option  value={3} key={3}>Filter - Most disliked</option>
            </Form.Select>
            
        {/* </FloatingLabel>    */}
        <Button variant="success" size="sm" type="submit" >Search</Button> 
        </Form.Group>
       
        {/* className="mb-3 d-flex" */}

      </Form>
    </div>
  )
}

export default Filter
