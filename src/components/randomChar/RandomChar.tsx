import { useEffect, useState } from 'react'

const useAsync = (asyncFunction, immediate = true) => {
  const [status, setStatus] = useState('idle')
  const [value, setValue] = useState(null)
  const [error, setError] = useState(null)

  // ПРОПУЩЕННАЯ ЧАСТЬ

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { error, execute, status, value }
}

// Usage
function App() {
  const { error, execute, status, value } = useAsync(myFunction, false)

  return (
    <div>
      {status === 'idle' && <div>Start your journey by clicking a button</div>}
      {status === 'success' && <div>{value}</div>}
      {status === 'error' && <div>{error}</div>}

      <button disabled={status === 'pending'} onClick={execute}>
        {status !== 'pending' ? 'Click me' : 'Loading...'}
      </button>
    </div>
  )
}
