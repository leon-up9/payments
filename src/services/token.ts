export const getToken = () => {
  const tokenString = sessionStorage.getItem("token");
  return tokenString;
};

export const saveToken = (userToken: string) => {
  sessionStorage.setItem("token", userToken);
};
