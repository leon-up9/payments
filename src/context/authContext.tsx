import React from "react";

export type IsAuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuth: boolean) => void;
};

export const AuthContext = React.createContext<IsAuthContextType | null>(null);

interface IContextPros {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IContextPros> = ({ children }) => {
  const [isAuth, setIsAuth] = React.useState(false);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: isAuth, setIsAuthenticated: setIsAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
