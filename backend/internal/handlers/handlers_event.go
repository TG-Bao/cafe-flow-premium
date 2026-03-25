package handlers

import (
	"net/http"

	"cute-calendar/internal/models"
	"cute-calendar/internal/repository"

	"github.com/gin-gonic/gin"
)

func GetEvents(c *gin.Context) {
	userID := c.MustGet("userID").(uint)
	var events []models.Event
	repository.DB.Preload("Label").Where("user_id = ?", userID).Find(&events)
	c.JSON(http.StatusOK, events)
}

func CreateEvent(c *gin.Context) {
	userID := c.MustGet("userID").(uint)
	var input models.Event
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	input.UserID = userID
	repository.DB.Create(&input)
	repository.DB.Preload("Label").First(&input, input.ID)
	c.JSON(http.StatusOK, input)
}

func UpdateEvent(c *gin.Context) {
	userID := c.MustGet("userID").(uint)
	var event models.Event
	if err := repository.DB.Where("id = ? AND user_id = ?", c.Param("id"), userID).First(&event).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Event not found!"})
		return
	}

	var input models.Event
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	input.ID = event.ID
	input.UserID = userID
	repository.DB.Model(&event).Select("*").Updates(input)
	repository.DB.Preload("Label").First(&event, event.ID)
	c.JSON(http.StatusOK, event)
}

func DeleteEvent(c *gin.Context) {
	userID := c.MustGet("userID").(uint)
	if err := repository.DB.Where("id = ? AND user_id = ?", c.Param("id"), userID).Delete(&models.Event{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": true})
}
