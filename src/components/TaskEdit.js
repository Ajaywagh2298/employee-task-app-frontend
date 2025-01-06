import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    OutlinedInput,
    Chip
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

export function TaskEdit({ task, onSave, onCancel }) {
    const [taskName, setTaskName] = useState(task.task_name);
    const [status, setStatus] = useState(task.task_status);
    const [description, setDescription] = useState(task.task_description);
    const [developers, setDevelopers] = useState(task.task_developers);
    const [testers, setTesters] = useState(task.task_tester);
    const [participants, setParticipants] = useState(task.task_participants);
    const navigate = useNavigate();

    const handleSave = async () => {
        const updatedTask = {
            ...task,
            task_name: taskName,
            task_status: status,
            task_description: description,
            task_developers: developers,
            task_tester: testers,
            task_participants: participants,
        };

        try {
            const response = await fetch(`http://localhost:8095/api/tasks/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            });

            if (response.ok) {
                onSave(updatedTask);
                navigate('/dashboard'); // Adjust the path to your actual dashboard route
            } else {
                console.error('Failed to update the task');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Box sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Edit Task</Typography>

            <TextField
                fullWidth
                label="Task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                sx={{ mb: 2 }}
            />

            <Typography variant="body1" sx={{ mb: 1 }}>Task Description</Typography>
            <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                style={{ height: "150px", mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                    labelId="status-label"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    input={<OutlinedInput label="Status" />}
                >
                    <MenuItem value="Not Started">Not Started</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Testing">Testing</MenuItem>
                    <MenuItem value="Need to Testing">Need to Testing</MenuItem>
                    <MenuItem value="In Complete">In Complete</MenuItem>
                    <MenuItem value="Need To Fix">Need To Fix</MenuItem>
                    <MenuItem value="Ready To Release">Ready To Release</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Developers</InputLabel>
                <Select
                    multiple
                    value={developers}
                    onChange={(e) => setDevelopers(e.target.value)}
                    input={<OutlinedInput label="Developers" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                >
                    <MenuItem value="Ajay Wagh">Ajay Wagh</MenuItem>
                    <MenuItem value="Another Developer">Another Developer</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Testers</InputLabel>
                <Select
                    multiple
                    value={testers}
                    onChange={(e) => setTesters(e.target.value)}
                    input={<OutlinedInput label="Testers" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                >
                    <MenuItem value="Ajay Wagh">Ajay Wagh</MenuItem>
                    <MenuItem value="Another Tester">Another Tester</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Participants</InputLabel>
                <Select
                    multiple
                    value={participants}
                    onChange={(e) => setParticipants(e.target.value)}
                    input={<OutlinedInput label="Participants" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                >
                    <MenuItem value="Ajay Wagh">Ajay Wagh</MenuItem>
                    <MenuItem value="Another Participant">Another Participant</MenuItem>
                </Select>
            </FormControl>

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button onClick={onCancel} variant="outlined">Cancel</Button>
                <Button onClick={handleSave} variant="contained">Save Changes</Button>
            </Box>
        </Box>
    );
}
