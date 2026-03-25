package handlers

import (
	"net/http"

	"cute-calendar/internal/models"
	"cute-calendar/internal/repository"

	"github.com/gin-gonic/gin"
)

func GetLabels(c *gin.Context) {
	userID := c.MustGet("userID").(uint)
	var labels []models.Label
	repository.DB.Where("user_id = ?", userID).Find(&labels)
	c.JSON(http.StatusOK, labels)
}

func CreateLabel(c *gin.Context) {
	userID := c.MustGet("userID").(uint)
	var input models.Label
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	input.UserID = userID
	repository.DB.Create(&input)
	c.JSON(http.StatusOK, input)
}

func UpdateLabel(c *gin.Context) {
	userID := c.MustGet("userID").(uint)
	var label models.Label
	if err := repository.DB.Where("id = ? AND user_id = ?", c.Param("id"), userID).First(&label).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Label not found!"})
		return
	}

	var input models.Label
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	input.ID = label.ID
	input.UserID = userID
	repository.DB.Model(&label).Updates(input)
	c.JSON(http.StatusOK, label)
}

func DeleteLabel(c *gin.Context) {
	userID := c.MustGet("userID").(uint)
	if err := repository.DB.Where("id = ? AND user_id = ?", c.Param("id"), userID).Delete(&models.Label{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": true})
}
