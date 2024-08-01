package todos

import (
	"fmt"
	"furrj/todo_2_remake/internal/dbHandler"
	"furrj/todo_2_remake/internal/types"
	"net/http"

	"github.com/gin-gonic/gin"
)

// DeleteTodo deletes a todo by id
func DeleteTodo(db *dbHandler.DBHandler) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		// init payload object to allow binding
		var payload types.RequestDeleteTodo
		// init response object as invalid
		response := types.ResponseValid{
			Valid: false,
		}

		// bind request body to payload
		if err := ctx.BindJSON(&payload); err != nil {
			fmt.Printf("Error binding payload: %+v\n", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}
		fmt.Printf("delete payload: %v\n", payload)

		// delete from db
		if err := db.DeleteTodoByUserID(payload.UserID, payload.TodoID); err != nil {
			fmt.Printf("error deleting todo: %+v\n", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}

		// set response to valid and send
		response.Valid = true
		ctx.JSON(http.StatusOK, response)
	}
}

// filter iterates through todos and removes one with matching ID
func filter(todos []types.Todo, id uint) []types.Todo {
	var filtered []types.Todo

	for _, todo := range todos {
		if todo.TodoID != id {
			filtered = append(filtered, todo)
		}
	}

	return filtered
}
