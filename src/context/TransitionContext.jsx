import React, { createContext } from "react";

const TransitionContext = createContext({});

const TransitionProvider = ({ children }) => {
  const value = {}; // or any state you want to share
  return (
    <TransitionContext.Provider value={value}>
      {children}
    </TransitionContext.Provider>
  );
};

export default TransitionProvider;
