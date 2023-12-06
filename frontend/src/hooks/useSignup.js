import { useState } from "react";
import {useUsersContext} from './useUsersContext'

export const useSignup = () => {
    const [error, setError] = useState('')
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useUsersContext()

    const signup = async (email, password, name) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/users/signup', {
            method:'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({email, password, name})
        })
        // parse response into json
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user' , JSON.stringify(json))
           
            // update the user context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
            setData(json)
        }
    }

    return {signup, isLoading, error, data}

}

