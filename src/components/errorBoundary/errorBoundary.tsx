import { Component } from 'react'

import { ErrorMessage } from '@/components/errorMessage/errorMessage'

export class ErrorBoundary extends Component<any, StateType> {
  state = {
    error: false,
  }

  componentDidCatch() {
    this.setState({
      error: true,
    })
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />
    }

    return this.props.children
  }
}

type StateType = {
  error: boolean
}
