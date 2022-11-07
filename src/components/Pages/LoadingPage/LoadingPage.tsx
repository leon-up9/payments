import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext, IsAuthContextType } from "../../../context/authContext";
import { useAuth } from "../../../hooks/useAuth";
import { ROUTES } from "../../../routes/consts";

const LoadingPage = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(
    AuthContext
  ) as IsAuthContextType;
  const { isAuth } = useAuth();

  useEffect(() => {
    setIsAuthenticated(isAuth);
  }, [isAuth, setIsAuthenticated]);

  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} />;
  }
  return <div>loading...</div>;
};

export default LoadingPage;
