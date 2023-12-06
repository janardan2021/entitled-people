import { useState } from "react";
import {useUsersContext} from './useUsersContext'

export const useLogin = () => {
    const [error, setError] = useState('')
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useUsersContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/users/login', {
            method:'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({email, password})
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

    return {login, isLoading, error, data}

}

