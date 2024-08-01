package main

import (
	"fmt"
	"furrj/todo_2_remake/internal/config"
	"furrj/todo_2_remake/internal/dbHandler"
	"furrj/todo_2_remake/internal/routing/consts/routeURL"
	"furrj/todo_2_remake/internal/routing/routes"
	"furrj/todo_2_remake/internal/routing/routes/todos"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/mandrigin/gin-spa/spa"

	"github.com/gin-gonic/gin"
)

func main() {
	// get environment variables, else exit
	envVars, err := config.GetEnv(".env")
	if err != nil {
		fmt.Fprintf(os.Stderr, "error getting environment vars: %+v\n", err)
		os.Exit(1)
	}

	// init DB connection, else exit
	db, err := dbHandler.InitDBHandler(envVars.DB_URL)
	if err != nil {
		fmt.Fprintf(os.Stderr, "error initializing db connection: %+v\n", err)
		os.Exit(1)
	}
	defer db.Conn.Close()

	// ROUTING
	router := gin.Default()

	// enable CORS to make requests from localhost (DEV ONLY)
	if os.Getenv(config.MODE) == "DEV" {
		fmt.Println("**DEV MODE DETECTED, ENABLING CORS**")
		config := cors.DefaultConfig()
		config.AllowAllOrigins = true
		config.AllowMethods = []string{"POST", "GET", "PUT", "DELETE"}
		// config.AllowHeaders = []string{consts.HeaderTypeAuthorization, "Content-Type"}
		router.Use(cors.New(config))
	}

	// register routes
	router.POST(routeURL.Register, routes.Register(db))
	router.POST(routeURL.Login, routes.Login(db))
	router.POST(routeURL.GetTodos, todos.GetTodos(db))
	router.POST(routeURL.AddTodo, todos.AddTodo(db))
	router.PUT(routeURL.UpdateTodo, todos.UpdateTodo(db))
	router.DELETE(routeURL.DeleteTodo, todos.DeleteTodo(db))

	// server react bundle
	router.Use(spa.Middleware("/", "client"))

	// listen on port
	log.Panic(router.Run(fmt.Sprintf(":%s", envVars.PORT)))
}
