import { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = ({ initialState, reducer, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateProvider = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("useStateProvider debe usarse dentro de un StateProvider");
  }
  return context;
};