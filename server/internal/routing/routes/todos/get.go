package todos

import (
	"fmt"
	"furrj/todo_2_remake/internal/dbHandler"
	"furrj/todo_2_remake/internal/types"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetTodos quicksorts todos by id and returns all todos
func GetTodos(db *dbHandler.DBHandler) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var payload types.RequestGetTodo
		var response []types.Todo

		// bind payload
		if err := ctx.ShouldBindJSON(&payload); err != nil {
			fmt.Printf("error binding payload: %v\n", err)
			ctx.JSON(http.StatusBadRequest, response)
			return
		}
		fmt.Printf("payload: %+v\n", payload)

		// get todos from db
		todos, err := db.GetTodosByUserID(payload.UserID)
		if err != nil {
			fmt.Printf("error getting todos: %v", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}

		// call quicksortTodosByID to sort todos
		todos = quickSortTodosByID(todos)
		fmt.Printf("%+v\n", todos)

		// send response
		ctx.JSON(http.StatusOK, todos)
	}
}

// quickSortTodosByID quick sorts slice of todos by id in place
func quickSortTodosByID(todos []types.Todo) []types.Todo {
	if todos == nil || len(todos) <= 1 {
		return todos
	}

	quicksort(todos, 0, len(todos)-1)
	return todos
}

// quicksort recursively quicksorts slice of todos in place
func quicksort(todos []types.Todo, low, high int) {
	if low < high {
		p := partition(todos, low, high)
		quicksort(todos, low, p-1)
		quicksort(todos, p+1, high)
	}
}

// partition partitions slice of todos in place
func partition(todos []types.Todo, low, high int) int {
	pivot := todos[high].TodoID
	i := low - 1

	for j := low; j < high; j++ {
		if todos[j].TodoID < pivot {
			i++
			todos[i], todos[j] = todos[j], todos[i]
		}
	}

	todos[i+1], todos[high] = todos[high], todos[i+1]
	return i + 1
}
