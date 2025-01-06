import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Container, Button, Grid, TextField } from '@mui/material';
import { Header } from '../components/Header';
import { TaskTable } from '../components/TaskTable';
import { CreateTaskForm } from '../components/CreateTaskForm';
import { TaskManager } from '../components/TaskManager';
import { TaskStatistics } from '../components/TaskStatistics';
import { formatISO, startOfWeek, endOfWeek } from 'date-fns';

export function Dashboard() {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [fromDate, setFromDate] = useState(formatISO(startOfWeek(new Date(), { weekStartsOn: 1 })));
    const [toDate, setToDate] = useState(formatISO(endOfWeek(new Date(), { weekStartsOn: 1 })));

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                // Convert fromDate and toDate to ISO format (e.g., "2025-01-01T00:00:00.000Z")
                const formattedFromDate = new Date(fromDate).toISOString();
                const formattedToDate = new Date(toDate).toISOString();

                // Fetch tasks with formatted dates in query string
                const response = await fetch(`http://localhost:8095/api/tasks?fromDate=${formattedFromDate}&toDate=${formattedToDate}`);

                // Check if the response is ok (status code 200)
                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }

                // Log response for debugging purposes
                const data = await response.json();

                // Set tasks in state
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, [fromDate, toDate]); // Fetch tasks whenever fromDate or toDate changes

    const handleCreateTask = (newTask) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
        setShowCreateForm(false);
    };

    const handleViewTask = (taskId) => {
        const task = tasks.find(t => t.task_id === taskId);
        if (task) {
            setSelectedTask(task);
        }
    };

    return (
        <>
            <Header />
            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Task Management Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container sx={{ mt: 4 }}>
                    <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                        <Typography variant="h4" component="h2">
                            Task Management
                        </Typography>
                        <Button variant="contained" color="primary" onClick={() => setShowCreateForm(true)}>
                            Create Task
                        </Button>
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 4 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="From Date"
                                type="date"
                                fullWidth
                                value={fromDate.split('T')[0]} // Show only the date part
                                onChange={(e) => setFromDate(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="To Date"
                                type="date"
                                fullWidth
                                value={toDate.split('T')[0]} // Show only the date part
                                onChange={(e) => setToDate(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                    </Grid>
                    <TaskStatistics tasks={tasks} />
                    {showCreateForm ? (
                        <CreateTaskForm onCreateTask={handleCreateTask} onCancel={() => setShowCreateForm(false)} />
                    ) : (
                        <TaskTable tasks={tasks} onViewTask={handleViewTask} sx={{width : '400vh'}}/>
                    )}
                    {selectedTask && (
                        <TaskManager task={selectedTask} />
                    )}
                </Container>
            </Box>
        </>
    );
}
