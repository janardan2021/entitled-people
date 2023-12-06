import { useState } from "react";
// import {useAuthContext} from './useAuthContext'

export const useFrustation = () => {
    const [error, setError] = useState('')
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const getFrustation = async (frustationId) => {
        setIsLoading(true)
        setError(null)
        const response = await fetch('/api/frustations/' + frustationId)
        // parse response into json
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok  && !json) {
            setError('No data available')
            setIsLoading(false)
        }

        if (response.ok  && json) {
            setIsLoading(false)
            setData(json)
        }
    }

    return {getFrustation, isLoading, error, data}

}


