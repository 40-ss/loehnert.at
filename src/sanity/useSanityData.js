import {useEffect, useState} from 'react'
import {client} from './client'

/**
 * Minimal fetch hook for Sanity GROQ queries.
 *
 * Returns `{data, error, loading}`. Cancels its setState calls if the
 * component unmounts mid-request to avoid the React "setState on unmounted
 * component" warning.
 *
 * For a small site this is enough. If query count grows, swap to
 * @sanity/react-loader or @tanstack/react-query for caching + dedup.
 */
export function useSanityData(query, params = {}) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  // Stable key for the deps array — params is a plain object, comparing by
  // reference would refire the effect on every render.
  const paramsKey = JSON.stringify(params)

  useEffect(() => {
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

  return {data, error, loading}
}
