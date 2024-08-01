import axios, { AxiosResponse } from "axios";
import {
  type T_FORMINFO_REGISTER,
  type T_APIRESULT_VALID,
  type T_FORMINFO_LOGIN,
  type T_TODO,
  type T_APIRESULT_LOGIN,
  type T_APIREQUEST_ADD_TODO,
  type T_APIREQUEST_UPDATE_TODO,
  type T_APIREQUEST_DELETE_TODO,
  type T_APIRESULT_REGISTER,
} from "../types";

// Routes
const ROUTE_PREFIX: string = import.meta.env.DEV ? "http://localhost:5000" : "";
const API_ROUTES = {
  LOGIN: ROUTE_PREFIX + "/api/login",
  REGISTER: ROUTE_PREFIX + "/api/register",
  VALIDATE: ROUTE_PREFIX + "/api/validateSession",
  GET_TODOS: ROUTE_PREFIX + "/api/getTodos",
  ADD_TODO: ROUTE_PREFIX + "/api/addTodo",
  DELETE_TODO: ROUTE_PREFIX + "/api/deleteTodo",
  UPDATE_TODO: ROUTE_PREFIX + "/api/updateTodo",
};

export async function apiRequestLogin(
  formInfo: T_FORMINFO_LOGIN
): Promise<AxiosResponse<T_APIRESULT_LOGIN>> {
  return await axios<T_APIRESULT_LOGIN>({
    method: "POST",
    url: API_ROUTES.LOGIN,
    data: {
      ...formInfo,
    },
  });
}

export async function apiRequestRegister(
  formInfo: T_FORMINFO_REGISTER
): Promise<AxiosResponse<T_APIRESULT_REGISTER>> {
  return await axios<T_APIRESULT_REGISTER>({
    method: "POST",
    url: API_ROUTES.REGISTER,
    data: {
      username: formInfo.username,
      password: formInfo.firstPassword,
    },
  });
}

export async function apiRequestGetTodos(
  userID: number
): Promise<AxiosResponse<T_TODO[]>> {
  try {
    return await axios<T_TODO[]>({
      method: "POST",
      url: API_ROUTES.GET_TODOS,
      data: {
        user_id: userID,
      },
    });
  } catch (err: any) {
    throw err
  }
}

export async function apiRequestAddTodo(
  info: T_APIREQUEST_ADD_TODO
): Promise<AxiosResponse<T_APIRESULT_VALID>> {
  console.log(info);
  try {
    return await axios<T_APIRESULT_VALID>({
      method: "POST",
      url: API_ROUTES.ADD_TODO,
      data: {
        ...info
      },
    });
  } catch (err: any) {
    throw err
  }
}

export async function apiRequestDeleteTodo(
  info: T_APIREQUEST_DELETE_TODO
): Promise<AxiosResponse<T_APIRESULT_VALID>> {
  try {
    return await axios<T_APIRESULT_VALID>({
      method: "DELETE",
      url: API_ROUTES.DELETE_TODO,
      data: {
        ...info
      },
    });
  } catch (err: any) {
    throw err
  }
}

export async function apiRequestUpdateTodo(
  info: T_APIREQUEST_UPDATE_TODO
): Promise<AxiosResponse<T_APIRESULT_VALID>> {
  try {
    return await axios<T_APIRESULT_VALID>({
      method: "PUT",
      url: API_ROUTES.UPDATE_TODO,
      data: { ...info },
    });
  } catch (err: any) {
    throw err
  }
}
