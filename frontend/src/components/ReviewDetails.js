import { Container, Card } from "react-bootstrap"
import { FaThumbsUp, FaThumbsDown} from 'react-icons/fa';

import {formatDistanceToNow} from 'date-fns'

const ReviewDetails = ({reviewer}) => {
  return (
      <Card className='my-1 p-2 rounded '>
      <Card.Header className="themeColor p-2 rounded">
        <div className="d-flex justify-content-around">
          <div><strong style={{color: 'dodgerBlue'}}>Reacted by: </strong>{reviewer.name}</div>
          {(reviewer.isliked) ? <div><FaThumbsUp style={{color: 'green'}} /></div> : <div><FaThumbsDown style={{color: 'red'}} /></div>}
        </div>
        
      </Card.Header>
      <Card.Body>
        <Card.Text className="themeColor p-2 rounded mx-1">
        {reviewer.comment}
        <br/>
        <b style={{color: 'green', marginBottom:'0px', fontSize:'12px'}}>
          {formatDistanceToNow(new Date(reviewer.createdAt), {addSuffix: true})}
        </b>
        </Card.Text>
        </Card.Body>
    </Card>
    
  )
}

export default ReviewDetails
