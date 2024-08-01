package dbHandler

import (
	"context"
	"furrj/todo_2_remake/internal/types"
)

// GETS

const QGetTodosByUserID = `
	SELECT todo_id, title, content
	FROM todos
	WHERE user_id=$1
`

func (dbHandler *DBHandler) GetTodosByUserID(userID types.UserID) ([]types.Todo, error) {
	var todos []types.Todo

	rows, err := dbHandler.Conn.Query(context.Background(), QGetTodosByUserID, userID)
	if err != nil {
		return todos, err
	}
	defer rows.Close()

	for rows.Next() {
		var todo types.Todo

		err := rows.Scan(&todo.TodoID, &todo.Title, &todo.Content)
		if err != nil {
			return todos, err
		}

		todos = append(todos, todo)
	}

	if rows.Err() != nil {
		return todos, rows.Err()
	}

	return todos, nil
}

// EXECS

const EInsertTodoByUserID = `
	INSERT INTO todos (user_id, title, content)
	VALUES ($1, $2, $3)
`

func (dbHandler *DBHandler) InsertTodoByUserID(userID types.UserID, todo types.Todo) error {
	_, err := dbHandler.Conn.Exec(context.Background(), EInsertTodoByUserID, userID, todo.Title, todo.Content)
	if err != nil {
		return err
	}
	return nil
}

const EUpdateTodoByUserID = `
	UPDATE todos
	SET title=$3, content=$4
	WHERE user_id=$1 and todo_id=$2
`

func (dbHandler *DBHandler) UpdateTodoByUserID(userID types.UserID, todo types.Todo) error {
	_, err := dbHandler.Conn.Exec(context.Background(), EUpdateTodoByUserID, userID, todo.TodoID, todo.Title, todo.Content)
	if err != nil {
		return err
	}
	return nil
}

const EDeleteTodoByUserID = `
  DELETE FROM todos
  WHERE user_id=$1 and todo_id=$2
`

func (dbHandler *DBHandler) DeleteTodoByUserID(userID types.UserID, todoID uint) error {
	_, err := dbHandler.Conn.Exec(context.Background(), EDeleteTodoByUserID, userID, todoID)
	if err != nil {
		return err
	}
	return nil
}
