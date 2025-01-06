import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { createEmployee } from '../api';

const EmployeeForm = ({ adminId }) => {
    const [form, setForm] = useState({
        name: '',
        position: '',
        role: '',
        joinDate: '',
        phone: '',
        admin: 1,
        email: '',
        password: '', // Add password field
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            await createEmployee({ ...form, adminId });
            alert('Employee created successfully!');
        } catch (error) {
            console.error(error);
            alert('Error creating employee.');
        }
    };

    return (
        <Box p={3} maxWidth="400px" mx="auto">
            <Typography variant="h5" mb={2}>Create Employee</Typography>
            {Object.keys(form).map((field) => (
                <TextField
                    key={field}
                    name={field}
                    label={field.replace(/([A-Z])/g, ' $1')}
                    value={form[field]}
                    onChange={handleChange}
                    type={field === 'password' ? 'password' : 'text'}
                    fullWidth
                    margin="normal"
                />
            ))}
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </Box>
    );
};

export default EmployeeForm;
