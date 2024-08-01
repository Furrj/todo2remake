package todos

import (
	"fmt"
	"furrj/todo_2_remake/internal/dbHandler"
	"furrj/todo_2_remake/internal/types"
	"net/http"

	"github.com/gin-gonic/gin"
)

// UpdateTodo accepts a todo object and updates the todo
func UpdateTodo(db *dbHandler.DBHandler) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		// init payload to allow binding
		var payload types.RequestUpdateTodo
		// init response object as invalid
		response := types.ResponseValid{
			Valid: false,
		}

		// bind request body to payload
		if err := ctx.BindJSON(&payload); err != nil {
			fmt.Printf("error binding payload: %+v\n", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}
		fmt.Printf("update payload: %+v\n", payload)

		// update todo in db
		if err := db.UpdateTodoByUserID(payload.UserID, payload.Todo); err != nil {
			fmt.Printf("error updating: %+v\n", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}

		// set response to valid and send
		response.Valid = true
		ctx.JSON(http.StatusOK, response)
	}
}

// updateTodo updates todo with same ID in slice
func updateTodo(todos []types.Todo, todo types.Todo) {
	for i := range todos {
		if todos[i].TodoID == todo.TodoID {
			todos[i] = todo
		}
	}
}
