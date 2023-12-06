import { Container, Row, Col, Button} from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const Home = () => {

const navigate = useNavigate()

const handleClick = () => {
   navigate('/frustations')
}   

  return (
    <div>
      <Container >
        <Row className="my-5 d-flex justify-content-around align-items-center">
            <Col className="d-flex justify-content-center"><h4>Are you serious?</h4></Col>
            <Col className="d-flex justify-content-center"><h4>That's unaccaptable!</h4></Col>
            <Col className="d-flex justify-content-center"><h4>I'll sue you!</h4></Col>
        </Row>
        <Row className="my-5 d-flex justify-content-around align-items-center">
            <Col className="d-flex justify-content-center"><h4>It's against the laws!</h4></Col>
            <Col className="d-flex justify-content-center"><h4>This is my property</h4></Col>
        </Row>
        <Row className="my-5 d-flex justify-content-around align-items-center">
            <Col md="auto" className="d-flex justify-content-center"><h4>Really?</h4></Col>
            <Col  className="d-flex flex-column justify-content-center align-items-center">
            <div><h2><strong>Are you irritated with these entitled people?</strong></h2></div>
            <div><p> So are many others. Share about them and see what people think about it.</p></div>
            <div><Button variant="success" onClick={handleClick}>Share experience and view Reactions</Button></div>
            </Col>
            <Col md="auto" className="d-flex justify-content-center"><h4>Seriously?</h4></Col>
        </Row>
        <Row className="my-5 d-flex justify-content-around align-items-center">
            <Col className="d-flex justify-content-center"><h4>Let me talk to your manager!</h4></Col>
            <Col className="d-flex justify-content-center"><h4>Do you know who I am?</h4></Col>
            <Col className="d-flex justify-content-center"><h4>That's bullshit.</h4></Col>
        </Row>
        <Row className="my-5 d-flex justify-content-around align-items-center">
            <Col className="d-flex justify-content-center"><h4>Ughh, Come on!</h4></Col>
            <Col className="d-flex justify-content-center"><h4>I'm your manager.</h4></Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home
