import React from "react";
import { ToastContainer } from "react-toastify";
import Layout from "./container/Layout";
import ErrorBoundary from "./hoc/ErrorBoundary";
import { GlobalStyles } from "./components/styles/GlobalStyles";
import "react-toastify/dist/ReactToastify.css";
import { Reset } from "styled-reset";
import "./App.css";

export default function App() {
  return (
    <ErrorBoundary>
      <ToastContainer />
      <Reset />
      <GlobalStyles />
      <Layout />
    </ErrorBoundary>
  );
}
