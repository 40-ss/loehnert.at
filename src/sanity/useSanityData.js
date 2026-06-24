import {useEffect, useState} from 'react'
import {client} from './client'

export function useSanityData(query, params = {}) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const paramsKey = JSON.stringify(params)

  useEffect(() => {
    let cancelled = false

    function doFetch() {
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
    }

    setLoading(true)
    setError(null)
    doFetch()

    // Real-time listener — refetches whenever a matching document changes
    const subscription = client
      .listen(query, params, {includeResult: false})
      .subscribe(() => doFetch())

    return () => {
      cancelled = true
      subscription.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, paramsKey])

  return {data, error, loading}
}
