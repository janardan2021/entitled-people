import {Container, Row, Col,  Navbar} from 'react-bootstrap'
import {FaCopyright} from 'react-icons/fa'

const Footer = () => {
  return (
    <Navbar  bg="dark" style={{color:'white', height:'5rem'}} className='mt-5'>
      <Container >
       <Navbar.Text style={{color: 'white', marginLeft: '45%'}}><FaCopyright />Janardan</Navbar.Text>
      </Container>
   </Navbar> 
  )
}

export default Footer
