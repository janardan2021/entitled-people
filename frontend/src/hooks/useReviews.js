import { useState } from "react";
// import {useAuthContext} from './useAuthContext'

export const useReviews = () => {
    const [error, setError] = useState('')
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const getReviews = async (frustationId) => {
        setIsLoading(true)
        setError(null)
        const response = await fetch('/api/reviews/' + frustationId)
        // parse response into json
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok  && !json[0]) {
            setData([])
            setIsLoading(false)
        }

        if (response.ok  && json[0]) {
            setIsLoading(false)
            setData(json[0].reviewer)
        }
    }

    return {getReviews, isLoading, error, data}

}


