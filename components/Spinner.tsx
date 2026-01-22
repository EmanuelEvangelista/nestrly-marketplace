"use client";
import ClipLoader from "react-spinners/ClipLoader";
import React from "react";

interface LoadingProps {
  loading: boolean;
}

const override: React.CSSProperties = {
  display: "block",
  margin: "100px auto",
  borderColor: "red",
};

const Spinner = ({ loading }: LoadingProps) => {
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

export default Spinner;
