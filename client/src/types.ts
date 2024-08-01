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

export type T_TODO = {
  id: number;
  title: string;
  content: string;
};

export type T_USER_DATA = {
  username: string;
  user_id: number;
}

export type T_APIREQUEST_ADD_TODO = T_TODO &
{ user_id: number }
