import axios, { AxiosResponse } from "axios";
import {
	type T_FORMINFO_REGISTER,
	type T_APIRESULT_VALID,
	type T_FORMINFO_LOGIN,
	type T_TODO,
} from "../types";

// Routes
const ROUTE_PREFIX: string = import.meta.env.DEV ? "http://localhost:5000" : "";
const API_ROUTES = {
	LOGIN: ROUTE_PREFIX + "/api/login",
	REGISTER: ROUTE_PREFIX + "/api/register",
	VALIDATE: ROUTE_PREFIX + "/api/validateSession",
	GET_TODOS: ROUTE_PREFIX + "/api/getTodos",
	ADD_TODO: ROUTE_PREFIX + "/api/addTodo",
};

export async function apiRequestLogin(
	formInfo: T_FORMINFO_LOGIN
): Promise<AxiosResponse<T_APIRESULT_VALID>> {
	try {
		return await axios<T_APIRESULT_VALID>({
			method: "POST",
			url: API_ROUTES.LOGIN,
			data: {
				...formInfo,
			},
		});
	} catch (err: any) {
		throw new Error(err);
	}
}

export async function apiRequestRegister(
	formInfo: T_FORMINFO_REGISTER
): Promise<AxiosResponse<T_APIRESULT_VALID>> {
	try {
		return await axios<T_APIRESULT_VALID>({
			method: "POST",
			url: API_ROUTES.REGISTER,
			data: {
				username: formInfo.username,
				password: formInfo.firstPassword,
			},
		});
	} catch (err: any) {
		throw new Error(err);
	}
}

export async function apiRequestGetTodos(
	username: string
): Promise<AxiosResponse<T_TODO[]>> {
	try {
		return await axios<T_TODO[]>({
			method: "POST",
			url: API_ROUTES.GET_TODOS,
			data: {
				username,
			},
		});
	} catch (err: any) {
		throw new Error(err);
	}
}

export async function apiRequestAddTodo(
	todo: T_TODO
): Promise<AxiosResponse<T_APIRESULT_VALID>> {
	try {
		return await axios<T_APIRESULT_VALID>({
			method: "POST",
			url: API_ROUTES.ADD_TODO,
			data: {
				title: todo.title,
				content: todo.content,
			},
		});
	} catch (err: any) {
		throw new Error(err);
	}
}

// export async function apiRequestValidateSession(
// 	userDataTokens: T_TOKENS
// ): Promise<AxiosResponse<T_APIRESULT_VALIDATE_ACCESS_TOKEN>> {
// 	console.log("Running apiRequestValidateSession");
// 	try {
// 		return await axios<T_APIRESULT_VALIDATE_ACCESS_TOKEN>({
// 			method: "POST",
// 			url: API_ROUTES.VALIDATE,
// 			headers: {
// 				Authorization: `Bearer ${userDataTokens.access_token}`,
// 			},
// 		});
// 	} catch (err: any) {
// 		throw new Error(err);
// 	}
// }
