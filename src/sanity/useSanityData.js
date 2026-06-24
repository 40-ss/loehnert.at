import {useEffect, useState, useCallback} from 'react'
import {client} from './client'

export function useSanityData(query, params = {}) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const paramsKey = JSON.stringify(params)

  const fetchData = useCallback(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    client
      .fetch(query, params)
      .then((result) => {
        if (cancelled) return
        setData(result)
        setLoading(false)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err)
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, paramsKey])

  useEffect(() => {
    return fetchData()
  }, [fetchData])

  // Refetch when the browser tab regains focus
  useEffect(() => {
    const handleFocus = () => fetchData()
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [fetchData])

  return {data, error, loading}
}
