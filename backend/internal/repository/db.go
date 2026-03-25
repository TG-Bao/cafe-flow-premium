package repository

import (
	"fmt"
	"log"
	"os"

	"cute-calendar/internal/models"

	"gorm.io/driver/sqlserver"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	host := os.Getenv("DB_HOST")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	targetDB := os.Getenv("DB_NAME")
	port := os.Getenv("DB_PORT")

	if host == "" {
		host = "localhost"
	}
	if port == "" {
		port = "1434"
	}

	log.Printf("Attempting to connect to database at %s:%s (DB: %s)", host, port, targetDB)

	// 1. First, connect to 'master' to ensure the target database exists
	dsnMaster := fmt.Sprintf("sqlserver://%s:%s@%s:%s?database=master", user, password, host, port)
	dbMaster, err := gorm.Open(sqlserver.Open(dsnMaster), &gorm.Config{})
	if err == nil {
		// Use a safe name for database creation (remove special chars if any)
		dbMaster.Exec(fmt.Sprintf("IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = '%s') CREATE DATABASE [%s]", targetDB, targetDB))
		// Close master connection if needed (GORM usually handles it, but we'll move on)
	}

	// 2. Now connect to the actual target database
	dsn := fmt.Sprintf("sqlserver://%s:%s@%s:%s?database=%s", user, password, host, port, targetDB)
	database, err := gorm.Open(sqlserver.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Failed to connect to database!", err)
	}

	// Manually add user_id if missing (AutoMigrate sometimes fails on existing MSSQL tables)
	database.Exec("IF COL_LENGTH('events', 'user_id') IS NULL ALTER TABLE events ADD user_id INT")
	database.Exec("IF COL_LENGTH('labels', 'user_id') IS NULL ALTER TABLE labels ADD user_id INT")

	database.AutoMigrate(&models.User{}, &models.Label{}, &models.Event{})

	DB = database
}
