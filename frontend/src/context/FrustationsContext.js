import { createContext, useReducer } from "react";

export const FrustationsContext = createContext()

const initialValue = JSON.parse(localStorage.getItem("frustations")) || {frustations: null};

export const frustationsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ALL_FRUSTATIONS':
           return {
            frustations: action.payload
           } 
        case 'CREATE_A_FRUSTATION' : 
           return {
            frustations: [action.payload, ...state.frustations]
           }  
        case 'DELETE_A_FRUSTATION':
            return {
              frustations: state.frustations.filter((f) => f._id !== action.payload._id)  
            } 
        case 'UPDATE_A_FRUSTATION':
            return {
            
            frustations: state.frustations.map((f) => f._id == action.payload._id ? action.payload : f)  
            }        
        default: 
           return state    
    }
}

export const FrustationsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(frustationsReducer, initialValue)
    return (
        <FrustationsContext.Provider value={{...state, dispatch}}>
            {children}
        </FrustationsContext.Provider>
    )
}