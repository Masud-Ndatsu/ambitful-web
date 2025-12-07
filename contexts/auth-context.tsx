import React, { createContext } from "react";

interface ContextTypeValue {}

export const AuthContext = createContext<ContextTypeValue | null>(null);

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const value: ContextTypeValue = {};
  return <AuthContext.Provider value={value}>{children} </AuthContext.Provider>;
};
