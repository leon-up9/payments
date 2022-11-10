import React, { useEffect } from "react";
import { toast } from "react-toastify";
import api from "../services/client";
import useToken from "./useToken";

const getToken = () => {
  return api.getToken();
};

export const useAuth = () => {
  const [isAuth, setIsAuth] = React.useState(false);
  const { token, setToken } = useToken();

  useEffect(() => {
    if (token) {
      setIsAuth(true);
    } else {
      getToken()
        .then((res) => {
          setToken(res || "");
          setIsAuth(!!res);
        })
        .catch((err) => {
          toast.error(`Error Getting Token`);
          setIsAuth(false);
        });
    }
  }, [setToken, token]);

  return {
    isAuth,
  };
};
