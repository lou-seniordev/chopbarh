import React from "react";
import Layout from "./container/Layout";
import ErrorBoundary from "./hoc/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <Layout />
    </ErrorBoundary>
  );
}
