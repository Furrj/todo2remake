package types

type RequestLogin struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type RequestRegister struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type RequestGetTodo struct {
	UserID UserID `json:"user_id"`
}

type RequestAddTodo struct {
	Title   string `json:"title"`
	Content string `json:"content"`
	UserID  UserID `json:"user_id"`
}

type RequestUpdateTodo struct {
	Todo
	UserID UserID `json:"user_id"`
}

type RequestDeleteTodo struct {
	TodoID uint   `json:"todo_id"`
	UserID UserID `json:"user_id"`
}
