import React from 'react';
import { Card, CardContent, CardHeader, Typography, Grid } from '@mui/material';
import { Task } from '../schema/types';

interface TaskStatisticsProps {
    tasks: Task[];
}

export function TaskStatistics({ tasks }: TaskStatisticsProps) {
    if (!Array.isArray(tasks)) {
        console.error("Tasks should be an array but got:", tasks);
        return <div>Error: Invalid tasks data</div>;
    }

    const completedTasks = tasks.filter(task => task.status === 'Completed').length;
    const incompleteTasks = tasks.filter(task => task.status === 'Not Started').length;
    const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length;

    const calculateEfficiency = () => {
        if (tasks.length === 0) return 0;
        return Math.round((completedTasks / tasks.length) * 100);
    };

    return (
        <Grid container spacing={4} sx={{marginBottom : '5vh'}}>
            <Grid item xs={12} md={6} lg={3}>
                <Card>
                    <CardHeader title="Completed Tasks" />
                    <CardContent>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                            {completedTasks}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <Card>
                    <CardHeader title="Incomplete Tasks" />
                    <CardContent>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                            {incompleteTasks}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <Card>
                    <CardHeader title="In Progress Tasks" />
                    <CardContent>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                            {inProgressTasks}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <Card>
                    <CardHeader title="Task Efficiency" />
                    <CardContent>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                            {calculateEfficiency()}%
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
