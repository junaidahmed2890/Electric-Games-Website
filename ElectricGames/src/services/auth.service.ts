import api from "./api";
import TokenService from "./token.service";

const register = (firstName:any, lastName:any, email:any, password:any) => {
  return api
    .post("/account/register", {
      firstName,
      lastName,
      email,
      password,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

const login = (email:any, password:any) => {
  return api
    .post("/account/login", {
      email,
      password,
    })
    .then((response) => {
      if (response?.data?.accessToken) {
        TokenService.setUser(response.data);
      }
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user") as string);
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
