import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Surface to the console for debugging; a real deployment might report
    // this to a monitoring service instead.
    console.error("Ledger CRM crashed:", error, info);
  }

  handleReset = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return (
        <div
          className="ledger-root min-h-[400px] flex flex-col items-center justify-center gap-3 rounded-xl p-8 text-center"
          style={{ border: "1px solid #3A4239" }}
        >
          <h2 className="ledger-display text-xl">Something tore a page out of the ledger.</h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {this.state.error.message || "An unexpected error occurred."}
          </p>
          <button
            onClick={this.handleReset}
            className="px-3 py-1.5 rounded text-sm font-medium"
            style={{ background: "var(--accent)", color: "#1B1F1D" }}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
