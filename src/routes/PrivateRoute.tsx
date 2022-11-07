import { FC, useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext, IsAuthContextType } from "../context/authContext";

interface PropType {
  authenticationPath: string;
}

export const ProtectedLayout: FC<PropType> = ({ authenticationPath }) => {
  const { isAuthenticated } = useContext(AuthContext) as IsAuthContextType;
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={authenticationPath} state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
