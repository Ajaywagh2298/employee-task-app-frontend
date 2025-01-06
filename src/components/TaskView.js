import React from "react";
import {
    Box,
    Typography,
    Paper,
    Grid,
    Divider,
    Chip,
    IconButton,
    Button,
    Stack,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export function TaskView({ task, onClose }) {
    // const navigate = useNavigate(); // Use useNavigate instead of useHistory
    //
    // const handleViewTestList = () => {
    //     // navigate("/test-list"); // Navigate to the Test List page
    // };

    return (
        <Box
            sx={{
                p: 4,
                bgcolor: "background.paper",
                borderRadius: 3,
                boxShadow: 4,
                maxWidth: "800px",
                margin: "auto",
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">
                    {task.task_name}
                </Typography>
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>
            </Box>

            <Typography variant="body1" dangerouslySetInnerHTML={{ __html: task.task_description }} sx={{ mb: 3 }} />

            <Stack direction="row" spacing={2}>
                <Typography variant="subtitle1"><strong>Status:</strong> {task.task_status}</Typography>
                <Typography variant="subtitle1">
                    <strong>Start Date:</strong> {new Date(task.task_start_date).toLocaleDateString()}
                </Typography>
                <Typography variant="subtitle1">
                    <strong>End Date:</strong> {new Date(task.task_end_date).toLocaleDateString()}
                </Typography>
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h5" sx={{ mb: 1 }}>Assigned Developers</Typography>
            <Box sx={{ mb: 2 }}>
                {task.task_developers.map(dev => (
                    <Chip key={dev} label={dev} color="primary" variant="outlined" sx={{ mr: 1, mt: 1 }} />
                ))}
            </Box>

            <Typography variant="h5" sx={{ mb: 1 }}>Assigned Testers</Typography>
            <Box sx={{ mb: 2 }}>
                {task.task_tester.map(tester => (
                    <Chip key={tester} label={tester} color="secondary" variant="outlined" sx={{ mr: 1, mt: 1 }} />
                ))}
            </Box>

            <Typography variant="h5" sx={{ mb: 1 }}>Participants</Typography>
            <Box sx={{ mb: 2 }}>
                {task.task_participants.map(participant => (
                    <Chip key={participant} label={participant} variant="outlined" sx={{ mr: 1, mt: 1 }} />
                ))}
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h5">Code Branches</Typography>
            {task.task_branches.map(branch => (
                <Paper key={branch.name} sx={{ p: 2, mb: 2, bgcolor: "grey.100" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Typography variant="body1"><strong>Name:</strong> {branch.name}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body1"><strong>Source:</strong> {branch.source}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body1"><strong>Migration:</strong> {branch.migration}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            ))}

            <Divider sx={{ my: 3 }} />

            <Typography variant="h5">Sub Tasks</Typography>
            {task.sub_task_list.map(subTask => (
                <Paper key={subTask.sub_task_name} sx={{ p: 2, mb: 2, bgcolor: "grey.100" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Typography variant="body1"><strong>Name:</strong> {subTask.sub_task_name}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="body1"><strong>Status:</strong> {subTask.sub_task_status}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="body1"><strong>Developers:</strong> {subTask.sub_task_developer.join(", ")}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="body1"><strong>Create Date:</strong> {new Date(subTask.sub_task_create_date).toLocaleDateString()}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            ))}

            <Box sx={{ textAlign: "center", mt: 4 }}>
                {/*<Button variant="contained" color="primary" onClick={handleViewTestList}>*/}
                {/*    View Test List*/}
                {/*</Button>*/}

                <Button variant="contained" color="primary">
                    View Test List
                </Button>
            </Box>
        </Box>
    );
}
