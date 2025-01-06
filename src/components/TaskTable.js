import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import { Task } from '../schema/types';

interface TaskTableProps {
    tasks: Task[];
    onViewTask: (taskId: string) => void;
}

export function TaskTable({ tasks, onViewTask }: TaskTableProps) {
    return (
        <TableContainer component={Paper} >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Sr No
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Task Name
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Status
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1" fontWeight="bold">
                               Start Date
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1" fontWeight="bold">
                               End Date
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Create Date
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Assigned Developers
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Assigned Testers
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Participants
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="subtitle1" fontWeight="bold">
                                Actions
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks && tasks.length > 0 ? (
                        tasks.map((task, index) => (
                            <TableRow key={task.task_id} sx={{height : '10px'}}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{task.task_name}</TableCell>
                                <TableCell>{task.task_status}</TableCell>
                                <TableCell>{new Date(task.task_start_date).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(task.task_end_date).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(task.task_create_date).toLocaleDateString()}</TableCell>
                                <TableCell>{task.task_developers
                                    ? task.task_developers
                                        .join(', ') : ''}</TableCell>
                                <TableCell>{task.task_tester ? task.task_tester.join(', ') : ""}</TableCell>
                                <TableCell>{task.task_participants ? task.task_participants.join(', ') : ""}</TableCell>
                                <TableCell align="right">
                                    <Button variant="outlined" size="small" onClick={() => onViewTask(task.task_id)}>
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7} align="center">
                                No tasks available
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
