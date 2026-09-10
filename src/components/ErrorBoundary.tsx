import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.error('Unhandled error:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6 text-center">
          <div>
            <h1 className="text-headline">Something went wrong</h1>
            <p className="text-body text-muted mt-4">
              Please refresh the page. If the problem continues, try again later.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="mt-6 text-body text-accent hover:underline"
            >
              Back to homepage
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}