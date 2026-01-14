"use client";
import ClipLoader from "react-spinners/ClipLoader";
import React from "react";

interface loadingProps {
  loading: boolean;
}

const override: React.CSSProperties = {
  display: "block",
  margin: "100px auto",
  borderColor: "red",
};

const LoadingPage: React.FC<loadingProps> = ({ loading }) => {
  return (
    <ClipLoader
      color="#3b82f6"
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default LoadingPage;
