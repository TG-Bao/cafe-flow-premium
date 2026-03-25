package main

import (
	"log"
	"os"
	"strings"
	"time"

	"cute-calendar/internal/handlers"
	"cute-calendar/internal/repository"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables from project root
	godotenv.Load("../.env")

	// Initialize Database
	repository.ConnectDatabase()

	r := gin.Default()

	// CORS Middleware
	allowOrigins := os.Getenv("CORS_ORIGINS")
	origins := []string{"http://localhost:5175", "http://localhost:3000"}
	if allowOrigins != "" {
		origins = append(origins, strings.Split(allowOrigins, ",")...)
	}
	r.Use(cors.New(cors.Config{
		AllowOrigins:     origins,
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Auth Routes
	r.POST("/register", handlers.Register)
	r.POST("/login", handlers.Login)

	// Protected Routes
	authorized := r.Group("/")
	authorized.Use(handlers.AuthMiddleware())
	{
		authorized.GET("/events", handlers.GetEvents)
		authorized.POST("/events", handlers.CreateEvent)
		authorized.PUT("/events/:id", handlers.UpdateEvent)
		authorized.DELETE("/events/:id", handlers.DeleteEvent)

		authorized.GET("/labels", handlers.GetLabels)
		authorized.POST("/labels", handlers.CreateLabel)
		authorized.PUT("/labels/:id", handlers.UpdateLabel)
		authorized.DELETE("/labels/:id", handlers.DeleteLabel)
	}

	log.Println("Server started on :8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatal("Server error: ", err)
	}
}
