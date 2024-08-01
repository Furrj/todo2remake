export type T_FORMINFO_REGISTER = {
  username: string;
  firstPassword: string;
  secondPassword: string;
};

export type T_APIRESULT_VALID = {
  valid: boolean;
};

export type T_FORMINFO_LOGIN = {
  username: string;
  password: string;
};

export type T_APIRESULT_LOGIN = {
  user_id: number;
};

export type T_APIRESULT_REGISTER = T_APIRESULT_LOGIN

export type T_TODO = {
  todo_id: number;
  title: string;
  content: string;
};

export type T_USER_DATA = {
  username: string;
  user_id: number;
}

export type T_APIREQUEST_ADD_TODO = T_TODO &
{ user_id: number }

export type T_APIREQUEST_UPDATE_TODO = T_TODO &
{ user_id: number }

export type T_APIREQUEST_DELETE_TODO = { user_id: number, todo_id: number }
