import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Box, Typography, Card, CardContent, CardActions } from "@mui/material";
import { TaskView } from "./TaskView";
import { TaskEdit } from "./TaskEdit";

export function TaskManager({ task }) {
    const [isEditing, setIsEditing] = useState(false); // Manage editing state
    const [open, setOpen] = useState(false); // Manage dialog visibility for TaskManager

    // Open the dialog and set the mode (view/edit)
    const handleOpen = (editMode) => {
        setIsEditing(editMode);
        setOpen(true); // Open TaskManager dialog
    };

    // Close the dialog
    const handleClose = () => {
        setOpen(false); // Close TaskManager dialog
    };

    // Handle saving the task from TaskEdit component
    const handleSave = (updatedTask) => {
        console.log("Task updated", updatedTask);
        setOpen(false); // Close the dialog after saving
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            {/* Task Card */}
            <Card sx={{ width: 300 }}>
                <CardContent>
                    <Typography variant="h6">{task.task_name}</Typography>
                </CardContent>

                <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
                    {/* Buttons to open TaskManager Dialog for View or Edit */}
                    <Button variant="outlined" onClick={() => handleOpen(false)}>View</Button>
                    <Button variant="contained" onClick={() => handleOpen(true)}>Edit</Button>
                </CardActions>
            </Card>

            {/* Dialog for TaskManager with TaskView or TaskEdit inside */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>
                    {isEditing ? "Edit Task" : "View Task"}
                </DialogTitle>
                <DialogContent>
                    {isEditing ? (
                        <TaskEdit task={task} onSave={handleSave} onCancel={handleClose} />
                    ) : (
                        <TaskView task={task} onClose={handleClose} />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
