import { useCallback, useState } from 'react'

export const useHttp = () => {
  const [error, setError] = useState<null | string>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [process, setProcess] = useState<ProcessType>('waiting')
  const request = useCallback(
    async (
      url: string,
      method: MethodHttp = 'GET',
      body = null,
      headers = { 'Content-Type': 'application/json' }
    ) => {
      setLoading(true)
      setProcess('loading')
      try {
        const response = await fetch(url, { body, headers, method })

        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`)
        }
        const data = await response.json()

        setLoading(false)
        setProcess('confirmed')

        return data
      } catch (e: unknown) {
        const err = e as { message: string }

        setLoading(false)
        setError(err.message)
        setProcess('error')

        throw e
      }
    },
    []
  )
  const clearError = () => {
    setProcess('loading')
    setError(null)
  }

  return { clearError, error, loading, process, request }
}
type MethodHttp = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT'
export type ProcessType = 'confirmed' | 'error' | 'loading' | 'waiting'
