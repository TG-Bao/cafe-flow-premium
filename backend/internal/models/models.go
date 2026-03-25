package models

import (
	"time"
)

type User struct {
	ID        uint      `gorm:"primarykey" json:"id"`
	Username  string    `gorm:"type:nvarchar(100);uniqueIndex;not null" json:"username"`
	Password  string    `gorm:"not null" json:"-"`
	CreatedAt time.Time `json:"created_at"`
}

type Label struct {
	ID     uint   `gorm:"primarykey" json:"id"`
	UserID uint   `gorm:"not null" json:"user_id"`
	Name   string `json:"name"`
	Color  string `json:"color"`
}

type Event struct {
	ID         uint      `gorm:"primarykey" json:"id"`
	UserID     uint      `gorm:"not null" json:"user_id"`
	Title      string    `json:"title"`
	Content    string    `json:"content"`
	Location   string    `json:"location"`
	StartTime  time.Time `json:"start_time"`
	EndTime    time.Time `json:"end_time"`
	Importance string    `json:"importance"` // Low, Medium, High
	LabelID    *uint     `json:"label_id"`
	Label      Label     `gorm:"foreignKey:LabelID" json:"label"`
	IsFree     bool      `json:"is_free"` // true if free, false if busy
}

type LoginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type RegisterRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}
