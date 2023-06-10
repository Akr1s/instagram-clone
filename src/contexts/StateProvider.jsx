import React, { useContext, useReducer } from "react";

const DataContext = React.createContext();

function StateProvider({ reducer, initialState, children }) {
  return (
    <DataContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);

export default StateProvider;
