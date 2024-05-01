import { ErrorMessage } from '@/components/errorMessage/errorMessage'
import { Loader } from '@/components/loader/loader'
import Skeleton from '@/components/skeleton/Skeleton'
import { ProcessType } from '@/hooks/http.hook'

export const setContent = (process: ProcessType, Component: JSX.Element) => {
  switch (process) {
    case 'loading': {
      return <Skeleton />
    }
    case 'waiting': {
      return <Skeleton />
    }
    case 'error': {
      return <ErrorMessage />
    }
    case 'confirmed': {
      return Component
    }
    default: {
      return <ErrorMessage />
    }
  }
}
export const setRandomChar = (process: ProcessType, Component: JSX.Element) => {
  switch (process) {
    case 'loading': {
      return <Loader />
    }
    case 'waiting': {
      return <Loader />
    }
    case 'error': {
      return <ErrorMessage />
    }
    case 'confirmed': {
      return Component
    }
    default: {
      return <ErrorMessage />
    }
  }
}
