import React from "react";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import DomainRouter from "./routing/DomainRouter.jsx";

export default function App() {
  return (
    <ErrorBoundary>
      <DomainRouter />
    </ErrorBoundary>
  );
}
