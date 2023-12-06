
import {LinkContainer} from 'react-router-bootstrap'

import { Button} from "react-bootstrap"

const Paginate = ({pages, page}) => {
    return (
      pages > 1 && (
        <div  className="justify-content-between align-items-center ">
          {[...Array(pages).keys()].map((x) => (
              <LinkContainer key={x + 1} to={`/page/${x+1}`}>
                  <Button variant="outline-success mx-1" size="sm" active={x + 1 === page}>{x+1}</Button>                    
              </LinkContainer>
          ))}
         </div>
        )
        )
  }
  
  export default Paginate

//   {[...Array(pages).keys()].map((x) => (
//     <LinkContainer key={x + 1} to={`/page/${x+1}`}>
//         <Pagination.Item  className="paginationItem"
//                     style={{marginRight : '1rem'}}
//                     active={x + 1 === page}>{x+1}</Pagination.Item>                    
//     </LinkContainer>
// ))} 