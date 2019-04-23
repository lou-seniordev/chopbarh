import React from "react";
import Layout from "./container/Layout";
import ErrorBoundary from "./hoc/ErrorBoundary";
import { GlobalStyles } from "./components/styles/GlobalStyles";

export default function App() {
  return (
    <ErrorBoundary>
      <GlobalStyles />
      <Layout />
    </ErrorBoundary>
  );
}
