import { useState } from "react";
import { getToken, saveToken } from "../services/token";

const useToken = () => {
  const [token, setToken] = useState(getToken());

  const save = (userToken: string) => {
    saveToken(userToken);
    setToken(userToken);
  };

  return {
    setToken: save,
    token,
  };
};

export default useToken;
