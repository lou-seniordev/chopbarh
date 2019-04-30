import React from "react";
import Layout from "./container/Layout";
import ErrorBoundary from "./hoc/ErrorBoundary";
import { GlobalStyles } from "./components/styles/GlobalStyles";
import ContextProvider from "./hoc/ContextProvider";

export default function App() {
  return (
    <ErrorBoundary>
      <ContextProvider>
        <GlobalStyles />
        <Layout />
      </ContextProvider>
    </ErrorBoundary>
  );
}
