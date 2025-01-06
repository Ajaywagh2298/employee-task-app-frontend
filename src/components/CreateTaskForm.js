import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    OutlinedInput,
    Divider,
    IconButton,
    Grid,
    Paper,
    Chip
} from "@mui/material";
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { format, parse } from "date-fns";
const taskTypeList  = [{
    key : 'customization',
    value : "# CUSTOMIZATION"
},{
    key : 'production issue',
    value : '# PRODUCTION ISSUE'
},{
    key : 'road map',
    value : '# ROAD MAP'
}, {
    key : 'release',
    value : '# RELEASE'
},{
    key : 'optimization',
    value : '# OPTIMIZATION'
},{
    key : 'integration',
    value: "# INTEGRATION"
}]

export function CreateTaskForm({ onCreateTask, onCancel }) {
    const [taskName, setTaskName] = useState("");
    const [taskNumber, setTaskNumber] = useState("");
    const [status, setStatus] = useState("Not Started");
    const [description, setDescription] = useState("");
    const [assignedDevelopers, setAssignedDevelopers] = useState([]);
    const [assignedTesters, setAssignedTesters] = useState([]);
    const [assignedParticipants, setAssignedParticipants] = useState([]);
    const [ taskType, setTaskType] = useState([]);
    const [subTasks, setSubTasks] = useState([{ sub_task_name: "", sub_task_status: "", sub_task_developer: [], sub_task_create_date: "" }]);
    const [releaseDate, setReleaseDate] = useState("");
    const [codeBranches, setCodeBranches] = useState([{ name: "", source: "", migration: "" }]);
    const [developers, setDevelopers] = useState([]);
    const [testers, setTesters] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:8095/api/employees');
                if (!response.ok) {
                    throw new Error('Failed to fetch employees');
                }
                let employees = await response.json();
                employees = employees.filter((data) => data.admin === 1);
                setDevelopers(employees.map(dev => dev.name));
                setTesters(employees.map(test => test.name));
                setParticipants(employees.map(emp => emp.name));
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    const handleCreateTask = async () => {
        if (!taskName.trim()) {
            alert("Task name is required");
            return;
        }

        if (!fromDate || !toDate) {
            alert("Both From Date and To Date are required");
            return;
        }

        const parsedFromDate = parse(fromDate, "yyyy-MM-dd", new Date());
        const parsedToDate = parse(toDate, "yyyy-MM-dd", new Date());

        if (isNaN(parsedFromDate) || isNaN(parsedToDate)) {
            alert("Please provide valid dates.");
            return;
        }

        const newTask = {
            taskName,
            taskNumber : taskNumber,
            taskDescription: description,
            status,
            createDate: new Date(),
            fromDate: new Date(parsedFromDate),
            toDate: new Date(parsedToDate),
            taskType : taskType,
            developers: assignedDevelopers,
            testers: assignedTesters,
            participants: assignedParticipants,
            subTaskList: subTasks,
            codeBranches,
            tests: [],
        };

        try {
            const response = await fetch('http://localhost:8095/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            });

            if (!response.ok) {
                throw new Error('Failed to create task');
            }

            const createdTask = await response.json();
            onCreateTask(createdTask);
        } catch (error) {
            console.error('Error:', error);
            alert('There was a problem creating the task.');
        }
    };

    const handleReleaseTask = async () => {
        const releaseData = {
            taskName,
            taskId: Date.now().toString(),
            releaseDate: new Date(releaseDate),
            developers: assignedDevelopers,
            testers: assignedTesters,
            branches : codeBranches
        };

        try {
            const response = await fetch('http://localhost:8095/api/tasks/release', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(releaseData),
            });

            if (!response.ok) {
                throw new Error('Failed to release task');
            }

            alert('Task released successfully');
        } catch (error) {
            console.error('Error:', error);
            alert('There was a problem releasing the task.');
        }
    };

    const handleAddCodeBranch = () => {
        setCodeBranches([...codeBranches, { name: "", source: "", migration: "" }]);
    };

    const handleAddSubTask = () => {
        setSubTasks([...subTasks, { sub_task_name: "", sub_task_status: "Not Started", sub_task_developer: [], sub_task_create_date: "" }]);
    };

    const handleRemoveSubTask = (index) => {
        const newSubTasks = subTasks.filter((_, i) => i !== index);
        setSubTasks(newSubTasks);
    };

    const handleSubTaskChange = (index, field, value) => {
        const newSubTasks = [...subTasks];
        newSubTasks[index][field] = value;
        setSubTasks(newSubTasks);
    };

    return (
        <Box sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Create Task</Typography>
            <TextField
                fullWidth
                label="Task Number"
                value={taskNumber}
                onChange={(e) => setTaskNumber(e.target.value)}
                sx={{ mb: 2 }}
            />
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
                placeholder="Write task description..."
                style={{ height: "150px", mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2, mt:10 }}>
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

            {status === "Ready To Release" && (
                <TextField
                    fullWidth
                    label="Release Date"
                    type="date"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2 ,  backgroundColor : '#d4e6f1'}}
                />
            )}
            <Box sx={{ mb: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="testers-label">Task Type</InputLabel>
                    <Select
                        labelId="testers-label"
                        multiple
                        value={taskType}
                        onChange={(e) =>  setTaskType(e.target.value)}
                        input={<OutlinedInput label="Task Type" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={`# ${value.toUpperCase()}`} />
                                ))}
                            </Box>
                        )}
                        variant={'filled'}
                    >
                        {taskTypeList.map((tester) => (
                            <MenuItem key={tester.key} value={tester.key}>
                                {tester.value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                    fullWidth
                    label="From Date"
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    fullWidth
                    label="To Date"
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
            </Box>

            <Box sx={{ mb: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="developers-label">Assigned Developers</InputLabel>
                    <Select
                        labelId="developers-label"
                        multiple
                        value={assignedDevelopers}
                        onChange={(e) => setAssignedDevelopers(e.target.value)}
                        input={<OutlinedInput label="Assigned Developers" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                        variant={'filled'}
                    >
                        {developers.map((dev) => (
                            <MenuItem key={dev} value={dev}>
                                {dev}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ mb: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="testers-label">Assigned Testers</InputLabel>
                    <Select
                        labelId="testers-label"
                        multiple
                        value={assignedTesters}
                        onChange={(e) => setAssignedTesters(e.target.value)}
                        input={<OutlinedInput label="Assigned Testers" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                        variant={'filled'}
                    >
                        {testers.map((tester) => (
                            <MenuItem key={tester} value={tester}>
                                {tester}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ mb: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="testers-label">Participants</InputLabel>
                    <Select
                        labelId="testers-label"
                        multiple
                        value={assignedParticipants}
                        onChange={(e) => setAssignedParticipants(e.target.value)}
                        input={<OutlinedInput label="Participants" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                        variant={'filled'}
                    >
                        {participants.map((tester) => (
                            <MenuItem key={tester} value={tester}>
                                {tester}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* Sub Task Form */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>Sub Tasks</Typography>
                {subTasks.map((subTask, index) => (
                    <Paper sx={{ p: 2, mb: 1 }} key={index} elevation={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    label="Sub Task Name"
                                    value={subTask.sub_task_name}
                                    onChange={(e) => handleSubTaskChange(index, 'sub_task_name', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        value={subTask.sub_task_status}
                                        onChange={(e) => handleSubTaskChange(index, 'sub_task_status', e.target.value)}
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
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel id="testers-label">Participants</InputLabel>
                                    <Select
                                        labelId="testers-label"
                                        multiple
                                        value={subTask.sub_task_developer}
                                        onChange={(e) => handleSubTaskChange(index, 'sub_task_developer', e.target.value)}
                                        input={<OutlinedInput label="Participants" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                        variant={'filled'}
                                    >
                                        {participants.map((tester) => (
                                            <MenuItem key={tester} value={tester}>
                                                {tester}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    label="Assign Date"
                                    type="date"
                                    value={subTask.sub_task_create_date}
                                    onChange={(e) => handleSubTaskChange(index, 'sub_task_create_date', e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton onClick={() => handleRemoveSubTask(index)}>
                                    <RemoveCircle color="error" />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
                <Button variant="contained" onClick={handleAddSubTask} startIcon={<AddCircle />}>
                    Add Subtask
                </Button>
            </Box>

            {/* Code Branch Form */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>Code Branches</Typography>
                {codeBranches.map((branch, index) => (
                    <Paper sx={{ p: 2, mb: 1 }} key={index} elevation={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Branch Name"
                                    value={branch.name}
                                    onChange={(e) => {
                                        const newBranches = [...codeBranches];
                                        newBranches[index].name = e.target.value;
                                        setCodeBranches(newBranches);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Branch Source"
                                    value={branch.source}
                                    onChange={(e) => {
                                        const newBranches = [...codeBranches];
                                        newBranches[index].source = e.target.value;
                                        setCodeBranches(newBranches);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Migration</InputLabel>
                                    <Select
                                        value={branch.migration}
                                        onChange={(e) => {
                                            const newBranches = [...codeBranches];
                                            newBranches[index].migration = e.target.value;
                                            setCodeBranches(newBranches);
                                        }}
                                    >
                                        <MenuItem value="YES">YES</MenuItem>
                                        <MenuItem value="NO">NO</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton color="error" onClick={() => setCodeBranches(codeBranches.filter((_, i) => i !== index))}>
                                    <RemoveCircle />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
                <Button startIcon={<AddCircle />} onClick={handleAddCodeBranch} sx={{ mt: 1 }}>
                    Add Code Branch
                </Button>
            </Box>

            {status === "Ready To Release" && (
                <Button variant="contained" onClick={handleReleaseTask} sx={{ mt: 2 }}>
                    Add on Release List
                </Button>
            )}

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button onClick={onCancel} variant="outlined">Cancel</Button>
                <Button onClick={handleCreateTask} variant="contained">Create Task</Button>
            </Box>
        </Box>
    );
}
