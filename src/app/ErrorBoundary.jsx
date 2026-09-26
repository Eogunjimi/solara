import { Component } from 'react';

/** Last-resort render recovery; never expose exception details in the UI. */
export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Replace with a production monitoring adapter when one is configured.
    console.error('AFEEZTECHSOLAR render error', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="section">
          <div className="container" role="alert">
            <h1>Something went wrong.</h1>
            <p>Please reload the page to try again.</p>
            <button type="button" className="btn" onClick={() => window.location.reload()}>
              Reload page
            </button>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}
