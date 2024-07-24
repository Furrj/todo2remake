package todos

import (
	"fmt"
	"furrj/todo_2_remake/internal/routing/routes"
	"furrj/todo_2_remake/internal/types"
	"net/http"

	"github.com/gin-gonic/gin"
)

type deletePayload struct {
	ID uint `json:"id"`
}

func DeleteTodo() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var payload deletePayload
		response := routes.ResponseValid{
			Valid: false,
		}

		if err := ctx.BindJSON(&payload); err != nil {
			fmt.Printf("Error binding payload: %+v\n", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}
		fmt.Printf("Delete ID: %d\n", payload.ID)

		TestTodos = filter(TestTodos, payload.ID)
		response.Valid = true

		ctx.JSON(http.StatusOK, response)
	}
}

func filter(todos []types.Todo, id uint) []types.Todo {
	var filtered []types.Todo

	for _, todo := range todos {
		if todo.ID != id {
			filtered = append(filtered, todo)
		}
	}

	return filtered
}
