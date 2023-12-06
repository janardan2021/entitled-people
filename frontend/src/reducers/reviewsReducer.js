export const reviewsReducer = (state, action) => {
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